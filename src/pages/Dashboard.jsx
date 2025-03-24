import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCampaign } from "../contexts/CampaignContext";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Collapsible Sidebar component
const Sidebar = ({ isOpen, toggleSidebar, scrollToSection }) => {
  const sidebarItems = [
    { name: "Home", section: "home" },
    { name: "My Campaigns", section: "campaigns" },
    { name: "My Donations", section: "donations" },
    { name: "Campaign Donations", section: "campaignDonations" },
    { name: "Profile", section: "profile" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } bg-gradient-to-b from-indigo-600 to-black text-white shadow-xl backdrop-blur-md`}
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        {isOpen && <span className="text-2xl font-semibold">Dashboard</span>}
        <button onClick={toggleSidebar} className="p-2 focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <ul className="mt-4">
        {sidebarItems.map((item, idx) => (
          <li
            key={idx}
            onClick={() => {
              scrollToSection(item.section);
              // Optionally collapse sidebar on mobile after selection
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className="flex items-center p-4 hover:bg-indigo-700 cursor-pointer transition-colors"
          >
            <span className="flex-1">
              {isOpen ? item.name : item.name.charAt(0)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const { campaigns, fetchCampaigns, currency } = useCampaign();
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [campaignDonations, setCampaignDonations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Refs for sections
  const homeRef = useRef(null);
  const campaignsRef = useRef(null);
  const donationsRef = useRef(null);
  const campaignDonationsRef = useRef(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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

  // Fetch donations made by the logged-in user
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

  // Fetch donations for campaigns created by the logged-in user
  useEffect(() => {
    const fetchCampaignDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://ghanafund-server.onrender.com/api/donations/campaign-donations",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) {
          setCampaignDonations(data.donations);
        }
      } catch (error) {
        console.error("Failed to fetch campaign donations", error);
      }
    };

    if (user) {
      fetchCampaignDonations();
    }
  }, [user]);

  // Scroll handler for sidebar navigation
  const scrollToSection = (section) => {
    if (section === "home" && homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "campaigns" && campaignsRef.current) {
      campaignsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "donations" && donationsRef.current) {
      donationsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "campaignDonations" && campaignDonationsRef.current) {
      campaignDonationsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigate to campaign details page
  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        scrollToSection={scrollToSection}
      />

      {/* Main content */}
      <div className="flex-1 ml-16 md:ml-64 p-8 transition-all duration-300">
        <div ref={homeRef} className="flex flex-col gap-4 lg:gap-5">
          {/* User greeting */}
          <div className="flex gap-1 items-center">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={user ? user.profilePicture : "https://via.placeholder.com/150"}
              alt="User Avatar"
            />
            <h1 className="text-3xl font-semibold text-indigo-600">
              Welcome, {user ? user.firstName : "User"}!
            </h1>
          </div>
          {/* Contact Support Banner */}
          <motion.div
            className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-sm text-indigo-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-1">
              <strong>For withdrawals or inquiries:</strong>
            </p>
            <p>Phone: +233 200 80 5961</p>
            <p>WhatsApp: +233 201 26 6628</p>
            <p>Email: support@ghanafund.com</p>
            <p className="mt-1">
              Our customer support is available 24/7.
            </p>
          </motion.div>
        </div>

        {/* My Campaigns Section */}
        <section ref={campaignsRef} className="mt-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
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
                    onClick={() => handleCampaignClick(campaign._id)}
                    className="bg-white rounded-xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {campaign.description}
                    </p>
                    <div className="mb-3 text-sm text-gray-800">
                      <span className="font-bold text-indigo-600">
                        {currency}
                        {campaign.currentAmount.toLocaleString()}
                      </span>{" "}
                      raised of {currency}
                      {campaign.goal.toLocaleString()}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
                      <div
                        className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
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
        <section ref={donationsRef}>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
            My Donations
          </h2>
          {donations.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {donations.map((donation) => (
                <motion.div
                  key={donation._id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
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

        {/* Campaign Donations Section */}
        <section ref={campaignDonationsRef} className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
            Donations to Your Campaigns
          </h2>
          {campaignDonations.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaignDonations.map((donation) => (
                <motion.div
                  key={donation._id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
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
            <p className="text-gray-600">
              No donation messages for your campaigns yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
