import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import OwnerWebLayout from './components/layout/OwnerWebLayout';
import OwnerAppLayout from './components/layout/OwnerAppLayout';
import AdminLayout from './components/layout/AdminLayout';

// Common Screens
import SplashScreen from './components/screens/common/SplashScreen';
import LoginPage from './components/screens/common/LoginPage';
import SignupPage from './components/screens/common/SignupPage';
import SignupInfluencerPage from './components/screens/common/SignupInfluencerPage';
import SignupOwnerPage from './components/screens/common/SignupOwnerPage';

// Influencer Screens
import HomePage from './components/screens/HomePage';
import CampaignsListPage from './components/screens/CampaignsListPage';
import CampaignDetailPage from './components/screens/influencer/CampaignDetailPage';
import QRCodePage from './components/screens/influencer/QRCodePage';
import MyCampaignsPage from './components/screens/MyCampaignsPage';
import MyCampaignDetailPage from './components/screens/influencer/MyCampaignDetailPage';
import ProfilePage from './components/screens/ProfilePage';
import ProfileEditPage from './components/screens/influencer/ProfileEditPage';
import NotificationsPage from './components/screens/influencer/NotificationsPage';

// Owner Web Screens
import OwnerDashboardPage from './components/screens/owner-web/OwnerDashboardPage';
import StoresListPage from './components/screens/owner-web/StoresListPage';
import StoreNewPage from './components/screens/owner-web/StoreNewPage';
import StoreEditPage from './components/screens/owner-web/StoreEditPage';
import OwnerCampaignsPage from './components/screens/owner-web/OwnerCampaignsPage';
import OwnerCampaignNewPage from './components/screens/owner-web/OwnerCampaignNewPage';
import OwnerCampaignEditPage from './components/screens/owner-web/OwnerCampaignEditPage';
import CampaignStatusPage from './components/screens/owner-web/CampaignStatusPage';
import StaffManagementPage from './components/screens/owner-web/StaffManagementPage';
import OwnerSettingsPage from './components/screens/owner-web/OwnerSettingsPage';

// Owner App Screens
import OwnerAppHomePage from './components/screens/owner-app/OwnerAppHomePage';
import QRScanPage from './components/screens/owner-app/QRScanPage';
import CampaignHistoryPage from './components/screens/owner-app/CampaignHistoryPage';
import CampaignParticipantsPage from './components/screens/owner-app/CampaignParticipantsPage';
import OwnerAppProfilePage from './components/screens/owner-app/OwnerAppProfilePage';

// Admin Screens
import AdminDashboardPage from './components/screens/admin/AdminDashboardPage';
import AdminUsersPage from './components/screens/admin/AdminUsersPage';
import AdminStoresPage from './components/screens/admin/AdminStoresPage';
import AdminCampaignsPage from './components/screens/admin/AdminCampaignsPage';
import AdminReportsPage from './components/screens/admin/AdminReportsPage';
import AdminSettingsPage from './components/screens/admin/AdminSettingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        {/* Common Routes - No Layout */}
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/influencer" element={<SignupInfluencerPage />} />
        <Route path="/signup/owner" element={<SignupOwnerPage />} />

        {/* Influencer Routes - MainLayout (Bottom Tab Navigation) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="campaigns" element={<CampaignsListPage />} />
          <Route path="campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="qr/:applicationId" element={<QRCodePage />} />
          <Route path="my-campaigns" element={<MyCampaignsPage />} />
          <Route path="my-campaigns/:id" element={<MyCampaignDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<ProfileEditPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Owner Web Routes - OwnerWebLayout (Sidebar Navigation) */}
        <Route path="/owner" element={<OwnerWebLayout />}>
          <Route index element={<OwnerDashboardPage />} />
          <Route path="stores" element={<StoresListPage />} />
          <Route path="stores/new" element={<StoreNewPage />} />
          <Route path="stores/:id/edit" element={<StoreEditPage />} />
          <Route path="campaigns" element={<OwnerCampaignsPage />} />
          <Route path="campaigns/new" element={<OwnerCampaignNewPage />} />
          <Route path="campaigns/:id/edit" element={<OwnerCampaignEditPage />} />
          <Route path="campaigns/:id/status" element={<CampaignStatusPage />} />
          <Route path="staff" element={<StaffManagementPage />} />
          <Route path="settings" element={<OwnerSettingsPage />} />
        </Route>

        {/* Owner App Routes - OwnerAppLayout (Bottom Tab Navigation) */}
        <Route path="/owner/app" element={<OwnerAppLayout />}>
          <Route index element={<OwnerAppHomePage />} />
          <Route path="history" element={<CampaignHistoryPage />} />
          <Route path="campaign/:id" element={<CampaignParticipantsPage />} />
          <Route path="profile" element={<OwnerAppProfilePage />} />
        </Route>
        <Route path="/owner/qr-scan" element={<QRScanPage />} />

        {/* Admin Routes - AdminLayout (Sidebar Navigation) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="stores" element={<AdminStoresPage />} />
          <Route path="campaigns" element={<AdminCampaignsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
