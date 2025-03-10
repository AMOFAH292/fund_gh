import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const DonationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const campaign = {
    title: searchParams.get("title") || "Unknown Campaign",
    goal: searchParams.get("goal") || "0",
    raised: searchParams.get("raised") || "0",
    description: searchParams.get("description") || "No description provided.",
    image: searchParams.get("image") || "/default-image.jpg",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      {/* Floating Container */}
      <div className="relative bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 md:p-10">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">Make a Donation</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Campaign Details */}
          <div>
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold">{campaign.title}</h2>
            <p className="text-gray-600 mt-2">{campaign.description}</p>
            <p className="font-bold mt-4">
              Raised: GH₵ {Number(campaign.raised).toLocaleString()}
            </p>
            <p className="font-bold">
              Goal: GH₵ {Number(campaign.goal).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Donation Form */}
        <div className="mt-6 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Donation Amount (GHS)"
            className="border w-full px-3 py-2 rounded-lg mb-2"
          />
          <input
            type="text"
            placeholder="Name on Card"
            className="border w-full px-3 py-2 rounded-lg mb-2"
          />
          <input
            type="text"
            placeholder="Credit Card Number"
            className="border w-full px-3 py-2 rounded-lg mb-2"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Expiry Date"
              className="border w-1/2 px-3 py-2 rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="CVC"
              className="border w-1/2 px-3 py-2 rounded-lg mb-2"
            />
          </div>
          <button className="bg-indigo-600 text-white w-full py-2 mt-4 rounded-lg">
            Donate Now
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Your donation is secure and encrypted
        </p>
        <p className="text-center font-semibold mt-2">
          Thank You for Your Donation!
        </p>
        <p className="text-center text-gray-500">
          A confirmation message will be sent to your email after a successful
          donation.
        </p>
      </div>
    </div>
  );
};

export default DonationPage;
