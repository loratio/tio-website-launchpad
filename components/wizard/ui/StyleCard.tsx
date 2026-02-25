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
  id,
  name,
  description,
  preview,
  isSelected,
  onToggle,
}: StyleCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full text-left rounded-xl overflow-hidden border-2 transition-all ${
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-secondary hover:border-primary/30"
      }`}
    >
      {/* Preview Area */}
      <div className="aspect-[4/3] bg-gradient-to-br from-secondary/30 to-secondary/10 p-4 flex items-center justify-center">
        {preview}
      </div>

      {/* Info */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-primary mb-1">{name}</h3>
        <p className="text-sm text-text-muted">{description}</p>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}
