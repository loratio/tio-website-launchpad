"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { WizardData } from "../WizardContainer";
import ColorPalette from "../ui/ColorPalette";

interface ColorExplorationProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const colorPalettes = [
  {
    id: "ocean",
    name: "Ocean Depths",
    colors: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#03045E"],
  },
  {
    id: "forest",
    name: "Forest Walk",
    colors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#1B4332"],
  },
  {
    id: "sunset",
    name: "Golden Sunset",
    colors: ["#F72585", "#B5179E", "#7209B7", "#560BAD", "#3A0CA3"],
  },
  {
    id: "earth",
    name: "Earth Tones",
    colors: ["#BC6C25", "#DDA15E", "#FEFAE0", "#606C38", "#283618"],
  },
  {
    id: "professional",
    name: "Professional Blue",
    colors: ["#03045E", "#023E8A", "#0077B6", "#0096C7", "#48CAE4"],
  },
  {
    id: "warm",
    name: "Warm & Cozy",
    colors: ["#FF6B6B", "#FEC89A", "#FFD93D", "#C9B037", "#6B705C"],
  },
  {
    id: "monochrome",
    name: "Monochrome",
    colors: ["#212529", "#495057", "#6C757D", "#ADB5BD", "#E9ECEF"],
  },
  {
    id: "pastel",
    name: "Soft Pastels",
    colors: ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF"],
  },
  {
    id: "bold",
    name: "Bold & Vibrant",
    colors: ["#E63946", "#F4A261", "#2A9D8F", "#264653", "#E9C46A"],
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    colors: ["#FFFFFF", "#F8F9FA", "#E9ECEF", "#212529", "#6C757D"],
  },
];

export default function ColorExploration({ data, updateData }: ColorExplorationProps) {
  const [customColorInput, setCustomColorInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const togglePalette = (paletteId: string) => {
    const current = data.selectedPalettes;
    if (current.includes(paletteId)) {
      updateData({ selectedPalettes: current.filter((id) => id !== paletteId) });
    } else {
      updateData({ selectedPalettes: [...current, paletteId] });
    }
  };

  const addCustomColor = () => {
    const color = customColorInput.trim();
    if (color && /^#[0-9A-Fa-f]{6}$/.test(color) && !data.customColors.includes(color)) {
      updateData({ customColors: [...data.customColors, color] });
      setCustomColorInput("");
    }
  };

  const removeCustomColor = (color: string) => {
    updateData({ customColors: data.customColors.filter((c) => c !== color) });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-cormorant)]">
          Colors to explore
        </h2>
        <p className="text-gray-600">
          Select color palettes that resonate with your vision. You can also add custom colors.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {colorPalettes.map((palette) => (
          <ColorPalette
            key={palette.id}
            id={palette.id}
            name={palette.name}
            colors={palette.colors}
            isSelected={data.selectedPalettes.includes(palette.id)}
            onToggle={() => togglePalette(palette.id)}
          />
        ))}
      </div>

      {/* Custom Colors Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Colors (Optional)</h3>

        {/* Display custom colors */}
        {data.customColors.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {data.customColors.map((color) => (
              <div
                key={color}
                className="flex items-center gap-2 bg-gray-100 rounded-full pl-1 pr-3 py-1"
              >
                <div
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-700">{color}</span>
                <button
                  onClick={() => removeCustomColor(color)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add custom color */}
        {showCustomInput ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customColorInput}
              onChange={(e) => setCustomColorInput(e.target.value)}
              placeholder="#000000"
              className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              maxLength={7}
            />
            {customColorInput && /^#[0-9A-Fa-f]{6}$/.test(customColorInput) && (
              <div
                className="w-8 h-8 rounded border border-gray-200"
                style={{ backgroundColor: customColorInput }}
              />
            )}
            <button
              onClick={addCustomColor}
              disabled={!/^#[0-9A-Fa-f]{6}$/.test(customColorInput)}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomColorInput("");
              }}
              className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCustomInput(true)}
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add custom color</span>
          </button>
        )}
      </div>

      {(data.selectedPalettes.length > 0 || data.customColors.length > 0) && (
        <p className="mt-6 text-sm text-gray-500">
          {data.selectedPalettes.length} palette{data.selectedPalettes.length !== 1 ? "s" : ""} and{" "}
          {data.customColors.length} custom color{data.customColors.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
