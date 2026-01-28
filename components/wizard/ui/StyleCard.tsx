"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StyleCardProps {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  isSelected: boolean;
  onToggle: () => void;
}

export default function StyleCard({
  name,
  description,
  preview,
  isSelected,
  onToggle,
}: StyleCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`relative w-full text-left rounded-xl border-2 overflow-hidden transition-all selection-ring ${
        isSelected
          ? "border-primary shadow-lg shadow-primary/20"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* Preview area */}
      <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
        {preview}
      </div>

      {/* Text content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </motion.button>
  );
}
