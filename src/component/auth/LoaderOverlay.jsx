// LoaderOverlay.jsx
import { Loader2 } from "lucide-react";

const LoaderOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 rounded-lg z-10">
      <Loader2 className="animate-spin" size={48} />
    </div>
  );
};

export default LoaderOverlay;
