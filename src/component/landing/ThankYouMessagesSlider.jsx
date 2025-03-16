import React from "react";
import Slider from "react-slick";


// Sample data for thank-you messages (replace with API data as needed)
const thankYouMessages = [
  {
    id: 1,
    owner: "Kwame Mensah",
    message:
      "Thanks to GhanaFund, our community now has a sustainable water supply!",
    campaign: "Clean Water for All",
  },
  {
    id: 2,
    owner: "Ama Asante",
    message: "Your generosity has made our education dreams a reality.",
    campaign: "Education Fund",
  },
  {
    id: 3,
    owner: "Yaw Boateng",
    message:
      "We are forever grateful for the support that helped us save lives.",
    campaign: "Medical Aid",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed:2500,

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

const ThankYouMessagesSlider = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Thank You Messages
      </h2>
      <Slider {...sliderSettings}>
        {thankYouMessages.map((item) => (
          <div key={item.id} className="p-4">
            <div className="bg-indigo-50 rounded-lg shadow-lg p-6">
              <p className="text-lg italic text-gray-700 mb-4">
                "{item.message}"
              </p>
              <p className="text-gray-900 font-bold">- {item.owner}</p>
              <p className="text-sm text-gray-600">{item.campaign}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ThankYouMessagesSlider;
