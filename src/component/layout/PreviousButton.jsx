import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PreviousButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-20 left-6 z-50 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-3 shadow-xl hover:shadow-2xl hover:scale-110 transition-transform duration-200"
      aria-label="Go to previous page"
    >
      <ArrowLeft size={24} className="text-white" />
    </button>
  );
};

export default PreviousButton;
