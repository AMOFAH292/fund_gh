import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DonationPage from "./component/donation/DonationPage";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<DonationPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
