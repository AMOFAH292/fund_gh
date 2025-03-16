import React from "react";
import Slider from "react-slick";
import { assets } from "@/assets/assets";


// Sample data for successful campaigns (replace with API data as needed)
const successfulCampaigns = [
  {
    id: 1,
    title: "Clean Water for All",
    image: assets.Campaign1, // Replace with appropriate asset
    raised: "12,000",
    goal: "15,000",
  },
  {
    id: 2,
    title: "Education Fund",
    image: assets.Campaign2, // Replace with appropriate asset
    raised: "25,000",
    goal: "30,000",
  },
  {
    id: 3,
    title: "Medical Aid",
    image: assets.Campaign3, // Replace with appropriate asset
    raised: "18,000",
    goal: "20,000",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed:3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 },
    },
  ],
};

const SuccessfulCampaignsSlider = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Successful Campaigns
      </h2>
      <Slider {...sliderSettings}>
        {successfulCampaigns.map((campaign) => (
          <div key={campaign.id} className="p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                <p className="text-gray-600">
                  Raised: GH₵ {campaign.raised} of GH₵ {campaign.goal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuccessfulCampaignsSlider;
