import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCampaign } from "@/contexts/CampaignContext";

const ActiveCampaigns = () => {
  const { campaigns, fetchCampaigns } = useCampaign();
  const navigate = useNavigate();

  // Fetch campaigns when component mounts
  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate to the campaign detail page when clicking on the card
  const handleViewDetails = (campaign) => {
    navigate(`/campaign/${campaign._id}`);
  };

  // Navigate to the donate page with query params when clicking on Donate button
  const handleDonate = (campaign, e) => {
    // Prevent card click event from firing
    e.stopPropagation();
    navigate(
      `/donate?title=${encodeURIComponent(campaign.title)}&goal=${
        campaign.goal
      }&raised=${campaign.currentAmount}&description=${encodeURIComponent(
        campaign.description
      )}&image=${encodeURIComponent(campaign.images[0] || "")}`
    );
  };

  return (
    <div className="my-10 px-4">
      <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Active Campaigns
      </h3>
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {campaigns.map((campaign, index) => (
          <button
            key={campaign._id}
            className={`relative bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between text-left transition-transform duration-300 hover:shadow-xl hover:scale-105 ${
              index === 0 ? "col-span-1 row-span-2 h-[740px]" : "h-[370px]"
            }`}
          >
            <img
              src={campaign.images[0]}
              alt={campaign.title}
              className="w-full h-2/3 object-cover rounded-lg"
            />
            <div className="mt-2">
              <h4 className="text-lg font-semibold">{campaign.title}</h4>
              <p className="text-sm text-gray-600 font-semibold">
                Goal: ${campaign.goal}
              </p>
              <p className="text-sm text-green-600 font-semibold">
                Raised: ${campaign.currentAmount}
              </p>
            </div>
            <motion.div
              className="w-full mt-2"
              initial={{ y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => handleViewDetails(campaign)}
                // onClick={(e) => handleDonate(campaign, e)}
                className="w-full bg-gray-900 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Read
              </button>
            </motion.div>
          </button>
        ))}
        <div className="col-span-3 flex justify-center items-center mt-6">
          <Link
            to={"/campaigns"}
            className="w-60 h-10 bg-white border-2 border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-500 hover:text-white"
          >
            Browse All Campaigns
          </Link>
        </div>
      </div>
      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Active Campaigns
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {campaigns.map((campaign) => (
            <button
              key={campaign._id}
              onClick={() => handleViewDetails(campaign)}
              className="relative bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between text-left transition-transform duration-300 hover:shadow-xl hover:scale-105 min-w-[280px]"
            >
              <img
                src={campaign.images[0]}
                alt={campaign.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h4 className="text-lg font-semibold">{campaign.title}</h4>
                <p className="text-sm text-gray-600 font-semibold">
                  Goal: ${campaign.goal}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Raised: ${campaign.currentAmount}
                </p>
              </div>
              <motion.div
                className="w-full mt-2"
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={(e) => handleDonate(campaign, e)}
                  className="w-full bg-gray-900 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Donate
                </button>
              </motion.div>
            </button>
          ))}
        </div>
        <div className="flex justify-center mb-8">
          <Link
            to={"/campaigns"}
            className="w-60 h-10 bg-white border-2 border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-500 hover:text-white"
          >
            Browse All Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActiveCampaigns;
