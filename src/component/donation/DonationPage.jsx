import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { toast } from "react-hot-toast";
import PreviousButton from "../layout/PreviousButton";

const DonationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
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

  // Calculate remaining amount allowed for donation
  const remainingAmount = Math.max(
    Number(campaign.goal) - Number(campaign.raised),
    0
  );

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    // Validate donation amount is positive
    if (!donationAmount || Number(donationAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    // Ensure donation doesn't exceed the remaining amount to meet the goal
    if (Number(donationAmount) > remainingAmount) {
      toast.error(
        `Donation exceeds the remaining goal of GH₵ ${remainingAmount.toLocaleString()}`
      );
      return;
    }

    // Optionally validate credit card fields here...
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
          body: JSON.stringify({
            amount: donationAmount,
            message: donationMessage,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Donation successful!");
        navigate(`/thank-you`);
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
      <PreviousButton />
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
            <p className="text-gray-700">
              Remaining: GH₵ {remainingAmount.toLocaleString()}
            </p>
          </div>
          {/* Donation Form Section */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">
              Make a Donation
            </h1>
            <form onSubmit={handleDonationSubmit} className="space-y-6">
              {/* Donation Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Amount (GHS)
                </label>
                <input
                  type="number"
                  placeholder="Enter donation amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                  // Optionally set the maximum to the remaining amount
                  // max={remainingAmount}
                />
              </div>
              {/* Donation Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Message (Optional)
                </label>
                <textarea
                  placeholder="Enter a message to the campaign..."
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                  className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows="3"
                ></textarea>
              </div>
              {/* Credit Card Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  maxLength="19"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    maxLength="4"
                    required
                  />
                </div>
              </div>
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
