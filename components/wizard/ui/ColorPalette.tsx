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
  name,
  colors,
  isSelected,
  onToggle,
}: ColorPaletteProps) {
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

      {/* Color swatches */}
      <div className="flex h-24">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Palette name */}
      <div className="p-3 bg-white">
        <h3 className="text-sm font-medium text-gray-700">{name}</h3>
      </div>
    </motion.button>
  );
}
