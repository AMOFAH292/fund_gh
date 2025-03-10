import PropTypes from "prop-types";

const CampaignCard = ({ title, goal, raised, image }) => {
  return (
    <button className="flex-shrink-0 w-64 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img src={image} alt={title} className="w-full h-60 object-cover"/>
      <div className="p-4">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-500">
          Goal: <span className="font-bold">${goal}</span>
        </p>
        <p className="text-sm text-green-600">
          Raised: <span className="font-bold">${raised}</span>
        </p>
      </div>
    </button>
  );
};

// Prop validation
CampaignCard.propTypes = {
  title: PropTypes.string.isRequired,
  goal: PropTypes.number.isRequired,
  raised: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default CampaignCard;
