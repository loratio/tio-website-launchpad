"use client";

import { useState } from "react";
import { WizardData } from "../WizardContainer";
import ColorPalette from "../ui/ColorPalette";
import { Plus, X } from "lucide-react";

interface ColorExplorationProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const palettes = [
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
  const [customColor, setCustomColor] = useState("#192845");

  const togglePalette = (paletteId: string) => {
    const current = data.selectedPalettes || [];
    if (current.includes(paletteId)) {
      updateData({ selectedPalettes: current.filter((p) => p !== paletteId) });
    } else {
      updateData({ selectedPalettes: [...current, paletteId] });
    }
  };

  const addCustomColor = () => {
    if (customColor && !(data.customColors || []).includes(customColor)) {
      updateData({ customColors: [...(data.customColors || []), customColor] });
    }
  };

  const removeCustomColor = (color: string) => {
    updateData({ customColors: (data.customColors || []).filter((c) => c !== color) });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Colours to explore
        </h2>
        <p className="text-text-muted">
          Select colour palettes that resonate with your brand vision. You can also add specific colours.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {palettes.map((palette) => (
          <ColorPalette
            key={palette.id}
            id={palette.id}
            name={palette.name}
            colors={palette.colors}
            isSelected={(data.selectedPalettes || []).includes(palette.id)}
            onToggle={() => togglePalette(palette.id)}
          />
        ))}
      </div>

      {/* Custom Colors Section */}
      <div className="p-5 bg-secondary/10 rounded-xl">
        <h3 className="font-semibold text-primary mb-4">Add specific colours</h3>

        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-2 flex-1">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border-2 border-secondary"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none uppercase"
            />
          </div>
          <button
            type="button"
            onClick={addCustomColor}
            className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {(data.customColors || []).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {(data.customColors || []).map((color) => (
              <div
                key={color}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-secondary"
              >
                <div
                  className="w-6 h-6 rounded border border-secondary"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-primary uppercase">{color}</span>
                <button
                  type="button"
                  onClick={() => removeCustomColor(color)}
                  className="text-text-muted hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
