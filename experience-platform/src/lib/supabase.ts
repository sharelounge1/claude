import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types (자동 생성 타입 - 나중에 supabase gen types로 업데이트 가능)
export type UserType = 'influencer' | 'owner' | 'admin';
export type UserLevel = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export type UserStatus = 'active' | 'inactive' | 'banned';
export type StoreCategory = 'cafe' | 'restaurant' | 'bar' | 'bakery' | 'izakaya' | 'korean' | 'chinese' | 'japanese' | 'western';
export type StoreStatus = 'active' | 'inactive';
export type CampaignStatus = 'active' | 'completed' | 'cancelled';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Profile {
  id: string;
  role: 'influencer' | 'owner' | 'admin';
  full_name: string;
  phone?: string;
  instagram_handle?: string;
  youtube_channel?: string;
  blog_url?: string;
  follower_count?: number;
  business_name?: string;
  business_number?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Store {
  id: string;
  owner_id: string;
  name: string;
  address: string;
  phone?: string;
  category: StoreCategory;
  open_time?: string;
  close_time?: string;
  status: StoreStatus;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  store_id: string;
  owner_id: string;
  name: string;
  description?: string;
  benefit: string;
  total_quota: number;
  current_quota: number;
  required_sns: string[];
  start_date: string;
  end_date: string;
  deadline: string;
  status: CampaignStatus;
  created_at: string;
  updated_at: string;
}

export interface CampaignApplication {
  id: string;
  campaign_id: string;
  user_id: string;
  status: ApplicationStatus;
  visit_date?: string;
  qr_code_used: boolean;
  qr_code_used_at?: string;
  created_at: string;
  updated_at: string;
}

export interface QRCode {
  id: string;
  application_id: string;
  user_id: string;
  campaign_id: string;
  code: string;
  expires_at: string;
  is_used: boolean;
  used_at?: string;
  scanned_by?: string;
  created_at: string;
}

export interface Review {
  id: string;
  application_id: string;
  user_id: string;
  campaign_id: string;
  store_id: string;
  rating: number;
  content: string;
  images?: string[];
  sns_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  owner_id: string;
  user_id: string;
  store_ids: string[];
  role: 'manager' | 'staff';
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}
