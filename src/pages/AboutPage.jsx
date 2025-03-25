import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10">
          About GhanaFund
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why We Exist</h2>
          <p className="text-lg leading-relaxed">
            We believe every Ghanaian deserves to thrive, no matter their challenges. Our purpose is to uplift the less fortunate, fostering compassion and unity across Ghana—because when one rises, we all rise.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How We Do It</h2>
          <p className="text-lg leading-relaxed">
            We bring this to life by linking generous hearts with those in need, offering a platform where stories spark action and causes gain support. With transparency, collaboration, and a deep drive for change, we transform donations into hope and opportunity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="text-lg leading-relaxed">
            We provide a crowdfunding platform where Ghanaians can fund dreams, community projects, or urgent needs—like medical care, education, or rebuilding after hardship. From Accra to Tamale, we connect donors and dreamers, transforming lives one contribution at a time.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutPage;
