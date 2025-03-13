import React, { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import fundLogo from "@/assets/FundLogo.png";
import LoginModal from "@/component/auth/LoginModal";
// import HelpDropdown from "@/component/layout/HelpDropdown"; // remove if not needed
import { useAuth } from "@/contexts/AuthContext";
import ConfirmLogoutModal from "../auth/ConfirmLogoutModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false); // remove if not needed
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    logout();
    setIsConfirmLogoutOpen(false);
    setIsProfileOpen(false);
  };

  // Function to handle "Start a Campaign" click
  const handleStartCampaign = () => {
    if (!token) {
      setIsLoginOpen(true);
    } else {
      navigate("/create-campaign-form");
    }
  };

  // Function to navigate to the dashboard
  const handleDashboard = () => {
    if (!token) {
      setIsLoginOpen(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="text-2xl font-bold flex items-center">
          <img src={fundLogo} alt="Logo" className="w-10 h-10 mr-2" />
          GhanaFund
        </a>

        <div className="hidden md:flex space-x-6 items-center">
          <div
            onClick={() => {
              navigate("/campaigns");
            }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg px-4 py-2 pl-10 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
          {!token ? (
            <Button onClick={() => setIsLoginOpen(true)} variant="outline">
              Login
            </Button>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <Button variant="outline">
                <User size={24} />
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-0 w-40 bg-white border rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      console.log("Go to Profile");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setIsConfirmLogoutOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {/* "Dashboard" Button (visible when logged in) */}
          {token && (
            <Button
              onClick={handleDashboard}
              className="bg-black hover:bg-gray-800"
            >
              Dashboard
            </Button>
          )}
          {/* "Start a Campaign" Button */}
          <Button
            onClick={handleStartCampaign}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            START A CAMPAIGN
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white shadow-lg p-4 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 w-full"
          />
          {!token ? (
            <Button
              onClick={() => setIsLoginOpen(true)}
              variant="outline"
              className="w-full"
            >
              Login
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <User size={24} />
            </Button>
          )}
          {/* Mobile "Dashboard" Button */}
          {token && (
            <Button
              onClick={handleDashboard}
              variant="default"
              className="w-full bg-black"
            >
              Dashboard
            </Button>
          )}
          {/* Mobile "Start a Campaign" Button */}
          <Button
            onClick={handleStartCampaign}
            variant="default"
            className="w-full bg-indigo-500"
          >
            START A CAMPAIGN
          </Button>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {/* Remove HelpDropdown if not needed */}
      {/* <HelpDropdown isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} /> */}
      <ConfirmLogoutModal
        isOpen={isConfirmLogoutOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsConfirmLogoutOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
