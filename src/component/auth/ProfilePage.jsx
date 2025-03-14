// ProfilePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

const ProfilePage = () => {
  const { token, user, setUser } = useAuth(); // setUser should update the auth context
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(user?.profilePicture || "");
  const [loading, setLoading] = useState(false);

  // Ref for hidden file input
  const fileInputRef = useRef(null);

  // Update fields when user context changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
      setPreview(user.profilePicture);
    }
  }, [user]);

  // Trigger file input click
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://ghanafund-server.onrender.com/api/user/edit-profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        if (setUser) setUser(data.user);
        setIsEditing(false);
      } else {
        toast.error(data.error || "Profile update failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6 pt-32">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-black p-8 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            {isEditing ? "Edit Your Profile" : "Your Profile"}
          </h1>
          <p className="text-white mt-2">
            {isEditing
              ? "Make changes to your personal information below."
              : "View and manage your personal details."}
          </p>
        </div>
        <div className="p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {/* Lucide Camera icon as a clickable element */}
                  <div
                    onClick={handleIconClick}
                    className="cursor-pointer p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <Camera size={32} className="text-indigo-600" />
                  </div>
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-24 h-24 object-cover rounded-full border mt-4"
                  />
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                  {loading ? "Updating..." : "Done"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <img
                  src={preview}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full border"
                />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-600 text-lg">{email}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Phone:</span>{" "}
                  <span className="text-gray-600">{phoneNumber}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Address:</span>{" "}
                  <span className="text-gray-600">{address}</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={toggleEditMode}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
