import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { question: "How do I create a campaign?", answer: "Click on 'Start a Fund' and follow the steps to set up your campaign with images, descriptions, and a goal amount." },
  { question: "How do I donate?", answer: "Browse campaigns, click on one you want to support, and follow the payment instructions." },
  { question: "Is my donation secure?", answer: "Yes, we use secure payment gateways to ensure your donation is safe." },
  { question: "Can I edit my campaign after publishing?", answer: "Yes, you can edit your campaign details from your account dashboard." }
];

const HelpDropdown = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={`absolute top-16 right-10 bg-white shadow-lg rounded-lg w-80 p-4 border ${isOpen ? 'block' : 'hidden'}`}>
      <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2">
          <button 
            className="w-full flex justify-between items-center text-left font-semibold py-2 border-b"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {faq.question}
            {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {openIndex === index && <p className="text-gray-600 mt-1 text-sm">{faq.answer}</p>}
        </div>
      ))}
      <button className="w-full mt-2 py-2 text-blue-600 font-semibold" onClick={onClose}>Close</button>
    </div>
  );
};

export default HelpDropdown;
