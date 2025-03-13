import React, { useEffect, useState } from "react";
import { useCampaign } from "@/contexts/CampaignContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import Skeleton from "../layout/Skeleton";

const CampaignList = () => {
  const { campaigns, fetchCampaigns, deleteCampaign } = useCampaign();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      // toast.success("Campaign deleted !");
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

  const handleDelete = async (campaignId, e) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (confirmed) {
      const toastId = toast.loading("Deleting campaign...");
      try {
        await deleteCampaign(campaignId);
        toast.dismiss(toastId);
        // toast.success("Campaign deleted successfully!");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Failed to delete campaign.");
      }
    }
  };

  // Navigate to campaign details on card click.
  const handleViewDetails = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        All Campaigns
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-600 text-center">No campaigns available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const isOwner =
              user && String(campaign.createdBy) === String(user.id);

            return (
              <motion.div
                key={campaign._id}
                onClick={() => handleViewDetails(campaign._id)}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition hover:scale-105"
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
                </div>
                {isOwner && (
                  <div className="absolute inset-0 bg-black/20 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
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
