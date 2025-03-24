import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useCampaign } from "@/contexts/CampaignContext";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCampaignForm = () => {
  const navigate = useNavigate();
  const { createCampaign } = useCampaign();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("Health");
  const [images, setImages] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);

  // New state for displaying the disclaimer modal
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  // State to track if the form is in the process of being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews[index] = file ? URL.createObjectURL(file) : null;
    setPreviews(newPreviews);
  };

  // This function does the actual submission after the disclaimer is accepted
  const handleCreateCampaign = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goal", goal);
    formData.append("category", category);

    images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    const toastId = toast.loading("Creating campaign...");
    const result = await createCampaign(formData);
    toast.dismiss(toastId);

    if (result) {
      setTitle("");
      setDescription("");
      setGoal("");
      setCategory("Health");
      setImages([null, null, null, null]);
      setPreviews([null, null, null, null]);
      navigate(`/campaign/${result._id}`);
    } else {
      toast.error("Failed to create campaign.");
    }
    setIsSubmitting(false);
  };

  // Instead of immediate submission, we open the disclaimer modal
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisclaimerOpen(true);
  };

  // Accepting disclaimer triggers campaign creation
  const handleDisclaimerAccept = () => {
    setIsDisclaimerOpen(false);
    handleCreateCampaign();
  };

  // Cancelling the modal simply closes it
  const handleDisclaimerCancel = () => {
    setIsDisclaimerOpen(false);
  };

  // Example list of categories
  const categories = ["Health", "Education", "Environment", "Community"];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl relative">
      <motion.h2
        className="text-3xl font-medium text-gray-800 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create Your Campaign
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Campaign Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter campaign title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>
        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Tell your story..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          ></textarea>
        </div>
        {/* Goal Field */}
        <div>
          <label
            htmlFor="goal"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Fundraising Goal ($)
          </label>
          <input
            id="goal"
            type="number"
            placeholder="e.g. 5000"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>
        {/* Category Field */}
        <div>
          <label
            htmlFor="category"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* Image Uploads */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Upload Images (up to 4)
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <input
                  id={`file-input-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(index, e.target.files[0] || null)
                  }
                  className="hidden"
                />
                <label
                  htmlFor={`file-input-${index}`}
                  className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md hover:border-indigo-400 transition-colors"
                >
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Remove informational disclaimer block from here */}
        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? "Submitting..." : "Create Campaign"}
        </motion.button>
      </form>

      {/* Disclaimer Modal */}
      {isDisclaimerOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 z-50 max-w-md mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Disclaimer
            </h3>
            <p className="text-gray-700 mb-6 text-sm">
              After creating your campaign, our team will contact you for verification.
              Your campaign will remain active during this process. Please note that if your campaign fails
              the verification process, it will be removed and any donated funds will be refunded.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDisclaimerCancel}
                className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDisclaimerAccept}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Accept
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaignForm;
