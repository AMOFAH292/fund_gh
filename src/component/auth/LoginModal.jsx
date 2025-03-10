import { useState, useEffect } from "react";
import googleIcon from "@/assets/devicon_google.png";
import appleIcon from "@/assets/Vector.png";
import microsoftIcon from "@/assets/logos_microsoft-icon.png";
import { motion } from "framer-motion";

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen && !isSignUpOpen) return null;

  const signUp = (e) =>{
e.target.value

  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50">
      {/* Login Modal */}
      {!isSignUpOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold text-center">Welcome</h2>
          <p className="text-center text-gray-600">Glad to see you again</p>

          {/* Social Login Buttons */}
          <div className="mt-4 space-y-3">
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100 cursor-pointer">
              <img src={googleIcon} alt="Google" className="w-6 mr-2" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100 cursor-pointer">
              <img src={appleIcon} alt="Apple" className="w-6" />
              Continue with Apple
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100 cursor-pointer">
              <img src={microsoftIcon} alt="Microsoft" className="w-6 mr-2" />
              Continue with Microsoft
            </button>
          </div>

          <p className="text-center text-gray-500 mt-4">OR LOGIN WITH EMAIL</p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg px-3 py-2 mt-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 mt-2"
          />
          <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg">
            LOG IN
          </button>

          <p className="text-center text-blue-600 mt-2 cursor-pointer">
            Forgot Password?
          </p>
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => setIsSignUpOpen(true)}
            >
              SIGN UP
            </span>
          </p>
        </motion.div>
      )}

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => {setIsSignUpOpen(false);
              
            }}
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <p className="text-gray-600 text-center">Create a new account</p>
          <div className="mt-4 space-y-3">
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100 cursor-pointer">
              <img src={googleIcon} alt="Google" className="w-6 mr-2" />
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100 cursor-pointer">
              <img src={appleIcon} alt="Apple" className="w-6" />
              Sign up with Apple
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100 cursor-pointer">
              <img src={microsoftIcon} alt="Microsoft" className="w-6 mr-2" />
              Sign with Microsoft
            </button>
          </div>
          <p className="text-center text-gray-500 mt-4">OR SIGN UP WITH EMAIL</p>
          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg px-3 py-2"
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              SIGN UP
            </button>
          </form>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => setIsSignUpOpen(false)}
            >
              LOGIN
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default LoginModal;
