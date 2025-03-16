// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import DonationPage from "./component/donation/DonationPage";
import toast, { Toaster } from "react-hot-toast";
import CreateCampaignForm from "./component/campaign/CampaignForm";
import CampaignList from "./component/campaign/CampaignList";
import EditCampaignForm from "./component/campaign/EditCampaignForm";
import StartCampaignPage from "./pages/StartCampaignPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import Navbar from "./component/layout/Navbar";
import PreviousButton from "./component/layout/PreviousButton";
import ThankYouPage from "./component/donation/ThankYouPage";
import NotFoundPage from "./component/layout/404Page";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./component/auth/ProfilePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AppContent = () => {
  const location = useLocation();
  const hidePrevButton =
    location.pathname === "/" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/user-profile";
  const hideNavBar = location.pathname === "/dashboard";

  return (
    <>
      {!hideNavBar && <Navbar />}
      {!hidePrevButton && <PreviousButton />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-profile" element={<ProfilePage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/create-campaign-form" element={<StartCampaignPage />} />
        <Route path="/create-campaign" element={<CreateCampaignForm />} />
        <Route path="/campaigns" element={<CampaignList />} />
        <Route path="/campaign/:campaignId" element={<CampaignDetailPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route
          path="/edit-campaign/:campaignId"
          element={<EditCampaignForm />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        //404 page
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
