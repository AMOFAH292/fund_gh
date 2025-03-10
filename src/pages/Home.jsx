import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/App.css";
import Footer from "@/component/layout/Footer";
import Navbar from "@/component/layout/Navbar";
import { motion } from "framer-motion";
import HomeImage from "@/assets/unitedhands.jpg";
import CampaignCard from "@/component/campaign/CampaignCard";
import { Button } from "@/components/ui/button";

const images = import.meta.glob("@/assets/*.{png,jpg}", { eager: true });
const activeCampaigns = [
  {
    id: 1,
    title: "Help Build a School",
    goal: 5000,
    raised: 3200,
    image: images["/src/assets/buildschool.jpg"].default,
    description: "Help us build a school for underprivileged children to give them a brighter future."
  },
  {
    id: 2,
    title: "Medical Support for Sarah",
    goal: 3000,
    raised: 1500,
    image: images["/src/assets/hospitalsarah.jpg"].default,
    description: "Sarah needs urgent medical care. Your donation will help cover her treatment expenses."
  },
  {
    id: 3,
    title: "Clean Water Project",
    goal: 10000,
    raised: 7500,
    image: images["/src/assets/cleanwater.jpg"].default,
    description: "Providing access to clean water for communities suffering from water scarcity."
  },
  {
    id: 4,
    title: "St. Macheal's Orphanage",
    goal: 5000,
    raised: 3200,
    image: images["/src/assets/orphange.jpg"].default,
    description: "Support the orphans at St. Macheal’s by providing food, clothing, and education."
  },
  {
    id: 5,
    title: "Support Volta Region Tidal Rave Victims",
    goal: 3000,
    raised: 1500,
    image: images["/src/assets/tidalvictims.jpg"].default,
    description: "Help families affected by tidal waves in the Volta Region recover and rebuild."
  },

];

const Home = () => {
  const navigate = useNavigate();

  const handleDonate = (campaign) => {
    navigate(
      `/donate?title=${encodeURIComponent(campaign.title)}&goal=${campaign.goal}&raised=${campaign.raised}&description=${encodeURIComponent(campaign.description)}&image=${encodeURIComponent(campaign.image)}`
    );
  };
  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full">
        <img
          src={HomeImage}
          alt="Hero Background"
          className="w-full h-[700px] object-cover brightness-75 opacity-100"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-10 text-black">
          <h2 className="text-4xl font-semibold text-white">
            Funding great causes made easy
          </h2>
          <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg">
            START A FUND
          </button>
        </div>
      </div>

      {/* Campaign card section */}
      <div className="px-6 py-10 scroll-mt-40">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800">Active Campaigns</h3>
          <button className="w-60 h-10 bg-white border-2 border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-500 hover:text-white">
            Browse All Campaigns
          </button>
        </div>

        {/* Campaign Cards Grid - Changes for Mobile View */}
        <div className="hidden md:grid grid-cols-3 gap-4 px-4">
          {activeCampaigns.map((campaign, index) => (
            <button
              key={campaign.id}
              className={`relative bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between text-left transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] ${
                index === 0 ? "col-span-1 row-span-2 h-[740px]" : "h-[370px]"
              }`}
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-2/3 object-cover rounded-lg"
              />
              <h4 className="mt-2 text-lg font-semibold">{campaign.title}</h4>
              <p className="text-sm text-gray-600 font-semibold">Goal: ${campaign.goal}</p>
              <p className="text-sm text-green-600 font-semibold">Raised: ${campaign.raised}</p>

              {/* Animated Donate Button */}
              <motion.div
              className="w-full mt-2"
              initial={{ y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                className="w-20 bg-gray-900 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                onClick={() =>
                {handleDonate(campaign)}
                }
              >
                Donate
              </button>
            </motion.div>
            </button>
          ))}
        </div>
      </div>
      {/* About Section */}
      

      <motion.div
        className="max-w-3xl mx-auto mt-5 mb-5 px-8 py-12 bg-white shadow-lg rounded-lg border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "backInOut" }}
      >
        <h3 className="text-4xl font-bold text-center text-indigo-500 mb-4">
          About GhanaFund
        </h3>
        <p className="text-lg text-gray-600 text-center leading-relaxed">
          GhanaFund is a community-driven crowdfunding platform built to empower
          individuals and organizations to raise money for the causes that truly
          matter. Whether you need financial support for medical emergencies,
          education, business ventures, disaster relief, or charitable
          initiatives, GhanaFund provides a secure, transparent, and
          user-friendly way to connect with donors who care. Whether you’re an
          individual in need, a group advocating for change, or a nonprofit
          organization working toward a mission, your voice deserves to be
          heard—and funded.
        </p>
      </motion.div>


      <Footer />
    </div>
  );
};

export default Home;
