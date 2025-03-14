// Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useCampaign } from "../contexts/CampaignContext";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";

// Modern Sidebar with gradient background and subtle glass effect
const Sidebar = () => (
  <div className="w-64 min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl backdrop-blur-md">
    <div className="p-6 text-2xl font-semibold border-b border-gray-700">
      Dashboard
    </div>
    <ul className="mt-4">
      {["Home", "My Campaigns", "My Donations", "Profile", "Settings"].map(
        (item, idx) => (
          <li
            key={idx}
            className="p-4 hover:bg-gray-700 cursor-pointer transition-colors"
          >
            {item}
          </li>
        )
      )}
    </ul>
  </div>
);

const Dashboard = () => {
  const { campaigns, fetchCampaigns } = useCampaign();
  const { user } = useAuth();

  const [donations, setDonations] = useState([]);

  // Fetch campaigns on mount
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Filter campaigns created by the logged in user
  const myCampaigns = useMemo(() => {
    if (!user) return [];
    return campaigns.filter(
      (campaign) =>
        campaign.createdBy === user._id || campaign.createdBy === user.id
    );
  }, [campaigns, user]);

  // Calculate progress percentage
  const calculateProgress = (current, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  // Fetch user donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://ghanafund-server.onrender.com/api/donations/my-donations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          setDonations(data.donations);
        }
      } catch (error) {
        console.error("Failed to fetch donations", error);
      }
    };

    if (user) {
      fetchDonations();
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome, {user ? user.firstName : "User"}!
        </h1>

        {/* My Campaigns Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Campaigns
          </h2>
          {myCampaigns.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myCampaigns.map((campaign) => {
                const progress = calculateProgress(
                  campaign.currentAmount,
                  campaign.goal
                );
                return (
                  <motion.div
                    key={campaign._id}
                    className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {campaign.description}
                    </p>
                    <div className="mb-3 text-sm text-gray-800">
                      <span className="font-bold text-green-600">
                        ${campaign.currentAmount.toLocaleString()}
                      </span>{" "}
                      raised of ${campaign.goal.toLocaleString()}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-700">
                      {progress}% funded
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">
              You have not created any campaigns yet.
            </p>
          )}
        </section>

        {/* My Donations Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Donations
          </h2>
          {donations.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {donations.map((donation) => (
                <motion.div
                  key={donation._id}
                  className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {donation.campaign.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Donation Amount: GH₵ {donation.amount.toLocaleString()}
                  </p>
                  {donation.message && (
                    <p className="text-gray-600 text-sm italic">
                      "{donation.message}"
                    </p>
                  )}
                  <p className="text-gray-500 text-xs mt-4">
                    Donated on:{" "}
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No donation data available yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
