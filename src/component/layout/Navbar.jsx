import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import fundLogo from "@/assets/FundLogo.png";
import LoginModal from "@/component/auth/LoginModal";
import HelpDropdown from "@/component/layout/HelpDropdown";  // Import HelpDropdown

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="text-2xl font-bold flex items-center">
          <img src={fundLogo} alt="Logo" className="w-10 h-10 mr-2" />
          GhanaFund
        </a>

        <div className="hidden md:flex space-x-6 items-center">
          <div className="relative">
            <input type="text" placeholder="Search..." className="border rounded-lg px-4 py-2 pl-10 focus:outline-none" />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
          <Button onClick={() => setIsLoginOpen(true)} variant="outline">Login</Button>
          <Button onClick={() => setIsHelpOpen(!isHelpOpen)} className="bg-indigo-500 hover:bg-indigo-600">Help</Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white shadow-lg p-4 rounded-lg">
          <input type="text" placeholder="Search..." className="border rounded-lg px-4 py-2 w-full" />
          <Button onClick={() => setIsLoginOpen(true)} variant="outline" className="w-full">Login</Button>
          <Button onClick={() => setIsHelpOpen(!isHelpOpen)} variant="default" className="w-full">Help</Button>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <HelpDropdown isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </nav>
  );
};

export default Navbar;
