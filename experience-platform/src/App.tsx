import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/screens/HomePage';
import CampaignsListPage from './components/screens/CampaignsListPage';
import MyCampaignsPage from './components/screens/MyCampaignsPage';
import ProfilePage from './components/screens/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="campaigns" element={<CampaignsListPage />} />
          <Route path="my-campaigns" element={<MyCampaignsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
