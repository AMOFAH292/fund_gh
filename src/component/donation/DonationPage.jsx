import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { useEffect } from "react";

const DonationPage = () => {
    
        useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const campaign = {
    title: searchParams.get("title") || "Unknown Campaign",
    goal: searchParams.get("goal") || "0",
    raised: searchParams.get("raised") || "0",
    description: searchParams.get("description") || "No description provided.",
    image: searchParams.get("image") || "/default-image.jpg",
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Card Container */}
        <div className="bg-white shadow-xl rounded-2xl m-15 w-full max-w-4xl p-6 md:p-10 flex flex-col md:flex-row gap-6">
          {/* Campaign Details Section */}
          <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
            <p className="text-gray-600 mb-2">{campaign.description}</p>
            <p className="font-bold">Raised: GH₵ {Number(campaign.raised).toLocaleString()}</p>
            <p className="font-bold">Goal: GH₵ {Number(campaign.goal).toLocaleString()}</p>
          </div>

          {/* Donation Form Section */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Make a Donation</h1>
            <input
              type="text"
              placeholder="Donation Amount (GHS)"
              className="border w-full px-3 py-2 rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="Name on Card"
              className="border w-full px-3 py-2 rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="Credit Card Number"
              className="border w-full px-3 py-2 rounded-lg mb-2"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Expiry Date"
                className="border w-1/2 px-3 py-2 rounded-lg mb-2"
              />
              <input
                type="text"
                placeholder="CVC"
                className="border w-1/2 px-3 py-2 rounded-lg mb-2"
              />
            </div>
            <button className="bg-indigo-600 text-white w-full py-2 mt-4 rounded-lg">
              Donate Now
            </button>
            <p className="text-center text-gray-600 mt-4">
              Your donation is secure and encrypted
            </p>
            <p className="text-center font-semibold mt-2">
              Thank You for Your Donation!
            </p>
            <p className="text-center text-gray-500">
              A confirmation message will be sent to your email after a successful donation.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationPage;
