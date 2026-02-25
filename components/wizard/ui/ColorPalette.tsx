"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ColorPaletteProps {
  id: string;
  name: string;
  colors: string[];
  isSelected: boolean;
  onToggle: () => void;
}

export default function ColorPalette({
  id,
  name,
  colors,
  isSelected,
  onToggle,
}: ColorPaletteProps) {
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
      {/* Color swatches */}
      <div className="flex h-20">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Name */}
      <div className="p-3 bg-white">
        <h3 className="font-medium text-primary text-sm">{name}</h3>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}
