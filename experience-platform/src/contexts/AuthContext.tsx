import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<Profile>) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Auth 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      console.log('🔍 프로필 조회 시작 - 사용자 ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ 프로필 조회 에러:', error);
        console.error('❌ 에러 코드:', error.code);
        console.error('❌ 에러 메시지:', error.message);

        // PGRST116은 "row not found" 에러
        if (error.code === 'PGRST116') {
          console.log('⚠️ 프로필이 없습니다. 기본 프로필 생성을 시도합니다...');
          await createDefaultProfile(userId);
          return;
        }

        throw error;
      }

      console.log('✅ 프로필 조회 성공:', data);
      setProfile(data);
    } catch (error: any) {
      console.error('❌ fetchProfile 에러:', error);
      console.error('❌ 에러 상세:', JSON.stringify(error, null, 2));
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function createDefaultProfile(userId: string) {
    try {
      console.log('🔨 기본 프로필 생성 시작 - 사용자 ID:', userId);

      // 현재 사용자 정보 가져오기
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('❌ 사용자 정보를 가져올 수 없습니다');
        setProfile(null);
        setLoading(false);
        return;
      }

      const defaultProfile = {
        id: userId,
        email: user.email!,
        user_type: 'influencer' as const,
        name: user.email?.split('@')[0] || '사용자',
        phone: '',
        instagram: null,
        youtube: null,
        blog: null,
        business_name: null,
        business_number: null,
        status: 'active' as const,
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert([defaultProfile])
        .select()
        .single();

      if (error) {
        console.error('❌ 기본 프로필 생성 실패:', error);
        console.error('❌ 에러 코드:', error.code);
        console.error('❌ 에러 메시지:', error.message);
        setProfile(null);
      } else {
        console.log('✅ 기본 프로필 생성 성공:', data);
        setProfile(data);
      }
    } catch (error: any) {
      console.error('❌ createDefaultProfile 에러:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string, userData: Partial<Profile>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) return { error };

      // 프로필 생성
      if (data.user && !error) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email!,
              user_type: userData.user_type!,
              name: userData.name!,
              phone: userData.phone,
              instagram: userData.instagram,
              youtube: userData.youtube,
              blog: userData.blog,
              business_name: userData.business_name,
              business_number: userData.business_number,
              status: 'active',
            },
          ]);

        if (profileError && profileError.code !== '23505') { // 23505 = unique violation (이미 존재)
          console.error('Profile creation error:', profileError);
        }
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error: any) {
      return { error };
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function updateProfile(updates: Partial<Profile>) {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // 로컬 상태 업데이트
      if (profile) {
        setProfile({ ...profile, ...updates });
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
