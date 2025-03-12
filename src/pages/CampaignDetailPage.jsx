// CampaignDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

const CampaignDetailPage = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      try {
        const response = await fetch(
          `https://ghanafund-server.onrender.com/api/campaign/${campaignId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCampaign(data.campaign);
        } else {
          toast.error(data.error || "Failed to fetch campaign.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetail();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading campaign details...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Campaign not found.</p>
      </div>
    );
  }

  // Calculate progress percentage (capped at 100%)
  const progressPercent = Math.min(
    (campaign.currentAmount / campaign.goal) * 100,
    100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      {/* Modern Hero Section */}
      {campaign.images && campaign.images.length > 0 && (
        <div className="relative h-80 md:h-[500px] w-full">
          <img
            src={campaign.images[0]}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for modern look */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {campaign.title}
            </motion.h1>
          </div>
        </div>
      )}
      {/* Glassmorphism Details Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 md:-mt-24">
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-800 font-bold text-xl">
                  Goal: ${campaign.goal}
                </p>
                <p className="text-gray-800 font-bold text-xl">
                  Raised: ${campaign.currentAmount}
                </p>
              </div>
              <motion.button
                onClick={() => navigate(`/donate?campaignId=${campaign._id}`)}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Donate Now
              </motion.button>
            </div>
            {/* Modern Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-4 mb-6">
              <div
                className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed mb-8">
              {campaign.description}
            </p>
            {/* Additional Images Gallery */}
            {campaign.images && campaign.images.length > 1 && (
              <div>
                {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  More Images
                </h2> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {campaign.images.slice(1).map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`${campaign.title} ${index + 2}`}
                      className="w-full h-60 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;
