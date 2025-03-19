// CampaignContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
const currency = 'GH₵'
  const { token } = useAuth();
  const [campaigns, setCampaigns] = useState([]);

  // Create a new campaign using FormData for multipart/form-data requests
  const createCampaign = async (formData) => {
    try {
      const response = await fetch(
        "https://ghanafund-server.onrender.com/api/campaign/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Do not set Content-Type for multipart/form-data requests,
            // the browser sets the correct boundary automatically.
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create campaign");
      }
      setCampaigns((prev) => [...prev, data.campaign]);
      toast.success("Campaign created successfully!");
      return data.campaign;
    } catch (err) {
      toast.error(err.message);
      return null;
    }
  };

  // Update an existing campaign.
  // formData should include new text fields, any new images, and optionally removeImages fields.
  const updateCampaign = async (campaignId, formData) => {
    try {
      const response = await fetch(
        `https://ghanafund-server.onrender.com/api/campaign/${campaignId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update campaign");
      }
      // Update local state (if needed)
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign._id === campaignId ? data.campaign : campaign
        )
      );
      toast.success("Campaign updated successfully!");
      return data.campaign;
    } catch (err) {
      toast.error(err.message);
      return null;
    }
  };

  // Delete a campaign by its ID.
  const deleteCampaign = async (campaignId) => {
    try {
      const response = await fetch(
        `https://ghanafund-server.onrender.com/api/campaign/${campaignId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete campaign");
      }
      setCampaigns((prev) =>
        prev.filter((campaign) => campaign._id !== campaignId)
      );
      toast.success("Campaign deleted successfully!");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  // Optionally, fetch all campaigns from the server.
  const fetchCampaigns = async () => {
    try {
      const response = await fetch(
        "https://ghanafund-server.onrender.com/api/campaign",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch campaigns");
      }
      setCampaigns(data.campaigns);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        setCampaigns,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        fetchCampaigns,
        currency
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => useContext(CampaignContext);
