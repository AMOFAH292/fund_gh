// EditCampaignForm.jsx
import { useCampaign } from "@/contexts/CampaignContext";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EditCampaignForm = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { campaigns, updateCampaign } = useCampaign();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
  });
  const [newImages, setNewImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // When campaigns load, find the one to edit and pre-fill the form.
  useEffect(() => {
    const campaign = campaigns.find((c) => c._id === campaignId);
    if (campaign) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        goal: campaign.goal,
        category: campaign.category || "",
      });
      setExistingImages(campaign.images || []);
    }
  }, [campaigns, campaignId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewImagesChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  // Toggle removal of an existing image
  const toggleRemoveImage = (imgUrl) => {
    setRemoveImages((prev) =>
      prev.includes(imgUrl)
        ? prev.filter((url) => url !== imgUrl)
        : [...prev, imgUrl]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("goal", formData.goal);
    data.append("category", formData.category);

    // Add new images
    newImages.forEach((file) => data.append("images", file));

    // Include removeImages if any are selected
    removeImages.forEach((imgUrl) => data.append("removeImages", imgUrl));

    const updatedCampaign = await updateCampaign(campaignId, data);
    if (updatedCampaign) {
      navigate("/campaigns");
    }
  };

  // For demonstration, a fixed list of categories.
  const categories = ["Health", "Education", "Environment", "Community"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-medium text-gray-800 mb-8 pb-4 border-b border-gray-200">
          Edit Campaign
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Goal Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Goal ($)
              </label>
              <input
                name="goal"
                type="number"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Existing Images */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Existing Images
                <span className="text-gray-500 text-sm ml-2">
                  (Click to mark for removal)
                </span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {existingImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => toggleRemoveImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={`Existing ${index}`}
                      className={`w-full h-32 object-cover rounded-lg transition-all ${
                        removeImages.includes(imgUrl)
                          ? "opacity-50 ring-2 ring-red-500"
                          : "group-hover:opacity-75"
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                        {removeImages.includes(imgUrl)
                          ? "Click to undo"
                          : "Remove image"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add New Images
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    {newImages.length > 0
                      ? `${newImages.length} file(s) selected`
                      : "Click to upload"}
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleNewImagesChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Campaign
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditCampaignForm;
