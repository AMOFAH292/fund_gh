import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ConfirmLogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
      >
        <h2 className="text-2xl font-bold text-center">Confirm Logout</h2>
        <p className="text-center text-gray-600 mt-2">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="default">
            Logout
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmLogoutModal;
