// DonationPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { toast, Toaster } from "react-hot-toast";

const DonationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Read campaign details from query params.
  const campaign = {
    id: searchParams.get("campaignId") || "",
    title: searchParams.get("title") || "Unknown Campaign",
    goal: searchParams.get("goal") || "0",
    raised: searchParams.get("raised") || "0",
    description: searchParams.get("description") || "No description provided.",
    image: searchParams.get("image") || "/default-image.jpg",
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    if (!donationAmount || Number(donationAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ghanafund-server.onrender.com/api/campaign/${campaign.id}/donate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: donationAmount }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Donation successful!");
        // Optionally, navigate back to the campaign details page or refresh details.
        navigate(`/campaign/${campaign.id}`);
      } else {
        toast.error(data.error || "Donation failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl m-4 w-full max-w-4xl p-6 md:p-10 flex flex-col md:flex-row gap-6">
          {/* Campaign Details Section */}
          <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
            <p className="text-gray-600 mb-2">{campaign.description}</p>
            <p className="font-bold">
              Raised: GH₵ {Number(campaign.raised).toLocaleString()}
            </p>
            <p className="font-bold">
              Goal: GH₵ {Number(campaign.goal).toLocaleString()}
            </p>
          </div>
          {/* Donation Form Section */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">
              Make a Donation
            </h1>
            <form onSubmit={handleDonationSubmit} className="space-y-4">
              <input
                type="number"
                placeholder="Donation Amount (GHS)"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {loading ? "Processing..." : "Donate Now"}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Your donation is secure and encrypted.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationPage;
