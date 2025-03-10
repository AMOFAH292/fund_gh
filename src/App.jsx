import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DonationPage from "./component/donation/DonationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<DonationPage />} />
      </Routes>
    </Router>
  );
}
export default App;