import { Link, useNavigate } from "react-router-dom";
import "@/App.css";
import Footer from "@/component/layout/Footer";
import Navbar from "@/component/layout/Navbar";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import ActiveCampaigns from "@/component/landing/ActiveCampaigns";

const Home = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="">
        <div className="relative w-full">
          <img
            src={assets.HomeImage}
            alt="Hero Background"
            className="w-full h-[60vh] md:h-[700px] object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-white capitalize">
              Funding great causes made easy
            </h2>
            <p className="text-base md:text-lg text-white mt-4 max-w-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
              magni hic officia.
            </p>
            <Link
              to={"/create-campaign-form"}
              className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              START A CAMPAIGN
            </Link>
          </div>
        </div>
      </div>

      {/* Active Campaigns Component */}
      <div>
        <ActiveCampaigns />
      </div>

      {/* About Section */}
      <motion.div
        className="max-w-3xl mx-auto my-10 px-8 py-12 bg-white shadow-lg rounded-lg border border-gray-200"
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
          user-friendly way to connect with donors who care.
        </p>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
