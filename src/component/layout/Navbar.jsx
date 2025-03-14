import React, { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import fundLogo from "@/assets/FundLogo.png";
import LoginModal from "@/component/auth/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmLogoutModal from "../auth/ConfirmLogoutModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    logout();
    setIsConfirmLogoutOpen(false);
    setIsProfileOptionsOpen(false);
  };

  const handleStartCampaign = () => {
    if (!token) {
      setIsLoginOpen(true);
    } else {
      navigate("/create-campaign-form");
    }
  };

  const handleDashboard = () => {
    if (!token) {
      setIsLoginOpen(true);
    } else {
      window.open("/dashboard", "_blank");
    }
  };

  // Toggle mobile account options
  const toggleProfileOptions = () => {
    setIsProfileOptionsOpen((prev) => !prev);
  };

  // Navigate to search page
  const handleSearchClick = () => {
    navigate("/campaigns?search=true");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="text-2xl font-bold flex items-center">
          <img src={fundLogo} alt="Logo" className="w-10 h-10 mr-2" />
          GhanaFund
        </a>

        <div className="hidden md:flex space-x-6 items-center">
          <Button onClick={handleSearchClick} variant="ghost" className="p-2">
            <Search size={20} />
          </Button>
          {!token ? (
            <Button onClick={() => setIsLoginOpen(true)} variant="outline">
              Login
            </Button>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsProfileOptionsOpen(true)}
              onMouseLeave={() => setIsProfileOptionsOpen(false)}
            >
              <Button variant="outline">
                <User size={24} />
              </Button>
              {isProfileOptionsOpen && (
                <div className="absolute right-0 mt-0 w-40 bg-white border rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate("/user-profile");
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
          {token && (
            <Button
              onClick={handleDashboard}
              className="bg-black hover:bg-gray-800"
            >
              Dashboard
            </Button>
          )}
          <Button
            onClick={handleStartCampaign}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            START A CAMPAIGN
          </Button>
        </div>

        {/* Mobile Navigation */}
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
            <>
              <Button
                onClick={toggleProfileOptions}
                variant="outline"
                className="w-full flex items-center justify-between"
              >
                <span className="flex items-center">
                  <User size={24} />
                  <span className="ml-2">Account</span>
                </span>
                {isProfileOptionsOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              {isProfileOptionsOpen && (
                <div className="w-full bg-white border rounded-lg shadow-md p-2">
                  <button
                    onClick={() => {
                      navigate("/user-profile");
                      setIsProfileOptionsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsConfirmLogoutOpen(true);
                      setIsProfileOptionsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
          {token && (
            <Button
              onClick={handleDashboard}
              variant="default"
              className="w-full bg-black"
            >
              Dashboard
            </Button>
          )}
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
      <ConfirmLogoutModal
        isOpen={isConfirmLogoutOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsConfirmLogoutOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
