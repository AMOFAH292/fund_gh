// LoginModal.jsx
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import googleIcon from "@/assets/devicon_google.png";
import appleIcon from "@/assets/Vector.png";
import microsoftIcon from "@/assets/logos_microsoft-icon.png";
import LoaderOverlay from "./LoaderOverlay";

const LoginModal = ({ isOpen, onClose }) => {
  const { signUp, login } = useAuth();

  // State for toggling between login and sign-up
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // States for sign-up form
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSignUpOpen(false);
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen && !isSignUpOpen) return null;

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !signUpEmail || !signUpPassword || !confirmPassword) {
      const errMsg = "All fields are required.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }
    if (!validateEmail(signUpEmail)) {
      const errMsg = "Please enter a valid email address.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }
    if (signUpPassword !== confirmPassword) {
      const errMsg = "Passwords do not match.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setIsLoading(true);
    const result = await signUp({
      name,
      email: signUpEmail,
      password: signUpPassword,
    });
    setIsLoading(false);

    if (result.success) {
      setName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setConfirmPassword("");
      setIsSignUpOpen(false);
      onClose();
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginEmail || !loginPassword) {
      const errMsg = "Both email and password are required.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }
    if (!validateEmail(loginEmail)) {
      const errMsg = "Please enter a valid email address.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setIsLoading(true);
    const result = await login({ email: loginEmail, password: loginPassword });
    setIsLoading(false);

    if (result.success) {
      setLoginEmail("");
      setLoginPassword("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <Toaster position="top-center" />

      {isLoading && <LoaderOverlay />}

      {/* Login Modal */}
      {!isSignUpOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative bg-white p-6 rounded-lg shadow-lg w-96"
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => {
              setIsSignUpOpen(false);
              onClose();
            }}
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold text-center">Welcome</h2>
          <p className="text-center text-gray-600">Glad to see you again</p>

          <div className="mt-4 space-y-3">
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100">
              <img src={googleIcon} alt="Google" className="w-6 mr-2" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100">
              <img src={appleIcon} alt="Apple" className="w-6" />
              Continue with Apple
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100">
              <img src={microsoftIcon} alt="Microsoft" className="w-6 mr-2" />
              Continue with Microsoft
            </button>
          </div>

          <p className="text-center text-gray-500 mt-4">OR LOGIN WITH EMAIL</p>
          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <input
              type="email"
              placeholder="Email Address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-2"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-blue-700"
            >
              LOG IN
            </button>
          </form>
          <p className="text-center text-blue-600 mt-2 cursor-pointer">
            Forgot Password?
          </p>
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100"
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
          className="relative bg-white p-6 rounded-lg shadow-lg w-96"
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => {
              setIsSignUpOpen(false);
              onClose();
            }}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <p className="text-gray-600 text-center">Create a new account</p>

          <div className="mt-4 space-y-3">
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100">
              <img src={googleIcon} alt="Google" className="w-6 mr-2" />
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100">
              <img src={appleIcon} alt="Apple" className="w-6" />
              Sign up with Apple
            </button>
            <button className="w-full flex items-center justify-center rounded-lg py-2 shadow-md border transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-gray-100">
              <img src={microsoftIcon} alt="Microsoft" className="w-6 mr-2" />
              Sign up with Microsoft
            </button>
          </div>

          <p className="text-center text-gray-500 mt-4">
            OR SIGN UP WITH EMAIL
          </p>
          <form onSubmit={handleSignUp} className="mt-4 space-y-3">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 hover:bg-blue-700"
            >
              SIGN UP
            </button>
          </form>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => {
                setIsSignUpOpen(false);
                onClose();
              }}
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
