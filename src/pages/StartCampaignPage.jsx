import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const StartCampaignPage = () => {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");

  const validateForm = () => {
    if (!region) {
      toast.error("Please select a region.");
      return false;
    }
    if (!district.trim()) {
      toast.error("District/Municipality cannot be empty.");
      return false;
    }
    return true;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Form validated! Redirecting...");
      setTimeout(() => {
        window.location.href = "/create-campaign"; // Simulating navigation
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="md:w-1/3 bg-[#f9f4ec] px-8 py-12 flex flex-col justify-center items-start">
        <h1 className="text-3xl font-medium text-gray-800 mb-4">
          Ready to Start <br /> Your Campaign?
        </h1>
        <p className="text-gray-600 max-w-sm">
          Launching your campaign is simple. Provide a few details below and let
          us help you share your story with the world.
        </p>
      </div>

      {/* Right Panel */}
      <div className="md:w-2/3 flex flex-col justify-center items-start px-8 py-12 bg-white">
        {/* <div className="w-full flex justify-end mb-6">
          <button className="text-sm text-indigo-500 font-semibold hover:text-indigo-700">
            Sign in
          </button>
        </div> */}

        {/* Form Content */}
        <form className="max-w-md w-full mx-auto" onSubmit={handleContinue}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Where in Ghana are you starting this campaign?
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Choose the region in which your campaign will be based.
          </p>

          {/* Region & District */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Region
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select a region</option>
                {[
                  "Ahafo",
                  "Ashanti",
                  "Bono",
                  "Bono East",
                  "Central",
                  "Eastern",
                  "Greater Accra",
                  "North East",
                  "Northern",
                  "Oti",
                  "Savannah",
                  "Upper East",
                  "Upper West",
                  "Volta",
                  "Western",
                  "Western North",
                ].map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                District / Municipality
              </label>
              <input
                id="district"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Kumasi Metropolitan"
                className="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Campaign Category */}
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            What is your campaign about?
          </h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "Medical",
              "Education",
              "Nonprofit",
              "Business",
              "Community",
              "Emergency",
              "Faith",
              "Family",
              "Memorial",
              "Events",
              "Creative",
              "Animals",
            ].map((category) => (
              <button
                key={category}
                type="button"
                className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-500 text-white rounded-md font-semibold hover:bg-indigo-600 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartCampaignPage;
