import { Link } from "react-router-dom";
import "@/App.css";
import Footer from "@/component/layout/Footer";
import Navbar from "@/component/layout/Navbar";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import ActiveCampaigns from "@/component/landing/ActiveCampaigns";
import ThankYouMessagesSlider from "@/component/landing/ThankYouMessagesSlider";
import SuccessfulCampaignsSlider from "@/component/landing/SuccessfulCampaignsSlider";
import AdvancedAboutSection from "@/component/landing/AdvancedAboutSection";
import { useEffect, useState } from "react";


const Home = () => {

  const [backgroundFilter, setBackgroundFilter] = useState("none");

  useEffect(() => {
    const updateBackgroundFilter = () => {
      if (window.innerWidth < 768) {
        setBackgroundFilter("blur(8px)"); // Apply blur on mobile
      } else {
        setBackgroundFilter("blur(8px)"); // Remove blur on larger screens
      }
    };

    // Set initial background filter based on screen size
    updateBackgroundFilter();

    // Listen for window resize events
    window.addEventListener("resize", updateBackgroundFilter);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateBackgroundFilter);
    };
  }, []);


  const AboutStyle = {
    backgroundImage: `url(https://media.istockphoto.com/id/2178639991/photo/palms-up-hands-of-a-group-of-multinational-people-african-latin-american-and-european-people.webp?a=1&b=1&s=612x612&w=0&k=20&c=DEyMc-_5KmbzWA6i4T5bSK2UJMCtKrbBmn0hJEwxXlU=)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    filter: backgroundFilter,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };

  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
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

      {/* Active Campaigns Component */}
      <div className="my-12">
        <ActiveCampaigns />
      </div>

      {/* About Section */}
      {/* <motion.div
  className="max-w-5xl mx-auto my-16 px-8 py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl rounded-3xl text-white"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <h3 className="text-5xl font-extrabold text-center mb-6">
    About GhanaFund
  </h3>
  <p className="text-xl leading-relaxed text-center">
    GhanaFund is a community-driven crowdfunding platform that is revolutionizing how causes connect with generous donors. Our cutting-edge technology creates a secure, transparent, and engaging experience for fundraising. We empower communities to bring their dreams to life—be it education, healthcare, disaster relief, or innovative business ventures.
  </p>
  <div className="mt-8 flex justify-center">
    <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg transform hover:scale-105 transition duration-300">
      Learn More
    </button>
  </div>
</motion.div> */}

<div className="relative" id="menu">
          <div style={AboutStyle}></div>
          <div className="relative z-10">
            <AdvancedAboutSection />
          </div>
        </div>


      {/* External Sliders */}
      <SuccessfulCampaignsSlider />
      <ThankYouMessagesSlider />

      <Footer />
    </div>
  );
};

export default Home;
