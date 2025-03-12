// DeleteModal.jsx
import React from "react";
import { motion } from "framer-motion";

export const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: isOpen ? 0 : 50, opacity: isOpen ? 1 : 0 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
      >
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900">
            Delete Campaign
          </h3>
          <p className="mt-2 text-gray-600">
            Are you sure you want to delete this campaign? This action cannot be
            undone.
          </p>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default DeleteModal;
