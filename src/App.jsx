import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DonationPage from "./component/donation/DonationPage";
import toast, { Toaster } from "react-hot-toast";
import CreateCampaignForm from "./component/campaign/CampaignForm";
import CampaignList from "./component/campaign/CampaignList";
import EditCampaignForm from "./component/campaign/EditCampaignForm";
import StartCampaignPage from "./pages/StartCampaignPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import Navbar from "./component/layout/Navbar";

function App() {
  return (
    <div>
      <Toaster />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/create-campaign-form" element={<StartCampaignPage />} />
          <Route path="/create-campaign" element={<CreateCampaignForm />} />
          <Route exact path="/campaigns" element={<CampaignList />} />
          <Route
            path="/campaign/:campaignId"
            element={<CampaignDetailPage />}
          />
          <Route
            path="/edit-campaign/:campaignId"
            element={<EditCampaignForm />}
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
