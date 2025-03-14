import React, { useEffect, useRef, useState } from "react";
import { useCampaign } from "@/contexts/CampaignContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import Skeleton from "../layout/Skeleton";

const CampaignList = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { campaigns, fetchCampaigns, deleteCampaign } = useCampaign();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state variables
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Number of skeleton cards to display when loading
  const skeletonCount = 6;

  const handleDeleteClick = (campaignId, e) => {
    e.stopPropagation();
    setSelectedCampaignId(campaignId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCampaignId) return;
    const toastId = toast.loading("Deleting campaign...");
    try {
      await deleteCampaign(selectedCampaignId);
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to delete campaign.");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedCampaignId(null);
    }
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      await fetchCampaigns();
      setIsLoading(false);
    };
    loadCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the component mounts, check for the search query parameter and focus the search input if found.
  useEffect(() => {
    if (searchParams.get("search") === "true" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchParams]);

  const handleViewDetails = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  // Filter campaigns based on selected category and search term
  const filteredCampaigns = campaigns.filter((campaign) => {
    const categoryMatch =
      selectedCategory === "All" || campaign.category === selectedCategory;
    const searchMatch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Fixed list of categories for demonstration
  const categories = ["All", "Health", "Education", "Environment", "Community"];

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        All Campaigns
      </h2>

      {/* Modern Filter UI */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-60 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="search"
            className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title..."
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <p className="text-gray-600 text-center">No campaigns available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => {
            const isOwner =
              user && String(campaign.createdBy) === String(user.id);
            return (
              <motion.div
                key={campaign._id}
                onClick={() => handleViewDetails(campaign._id)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition hover:scale-105"
                whileHover={{ scale: 1.03 }}
              >
                {campaign.images && campaign.images.length > 0 && (
                  <img
                    src={campaign.images[0]}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {campaign.description}
                  </p>
                  <div className="text-gray-700 text-sm">
                    <span className="font-semibold">Goal:</span> $
                    {campaign.goal}
                  </div>
                  <div className="text-gray-700 text-sm">
                    <span className="font-semibold">Raised:</span> $
                    {campaign.currentAmount}
                  </div>
                  {campaign.category && (
                    <div className="mt-2 text-sm text-gray-500">
                      Category: {campaign.category}
                    </div>
                  )}
                </div>
                {/* Read Button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(campaign._id);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    Read
                  </button>
                </div>
                {/* Owner options overlay (Edit/Delete) */}
                {isOwner && (
                  <div className="absolute inset-0 bg-black/20 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end items-center space-x-4 p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-campaign/${campaign._id}`);
                        }}
                        className="text-white text-sm hover:underline focus:outline-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(campaign._id, e)}
                        className="text-white text-sm hover:underline focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default CampaignList;
