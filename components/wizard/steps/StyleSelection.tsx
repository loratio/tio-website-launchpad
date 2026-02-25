"use client";

import { WizardData } from "../WizardContainer";
import StyleCard from "../ui/StyleCard";

interface StyleSelectionProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const styles = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean lines, lots of white space, simple elegance",
    preview: (
      <div className="w-full h-full flex flex-col gap-2 p-2">
        <div className="h-2 w-1/3 bg-primary/20 rounded" />
        <div className="h-1 w-2/3 bg-primary/10 rounded" />
        <div className="flex-1" />
        <div className="h-8 w-1/4 bg-primary/30 rounded" />
      </div>
    ),
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong colours, impactful typography, confident presence",
    preview: (
      <div className="w-full h-full flex flex-col gap-2 p-2">
        <div className="h-4 w-2/3 bg-primary rounded" />
        <div className="h-2 w-full bg-primary/40 rounded" />
        <div className="flex-1 bg-primary/10 rounded" />
      </div>
    ),
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated, refined, premium feel",
    preview: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-2">
        <div className="h-1 w-12 bg-primary/30 rounded" />
        <div className="h-3 w-24 bg-primary/20 rounded" />
        <div className="h-1 w-12 bg-primary/30 rounded" />
      </div>
    ),
  },
  {
    id: "playful",
    name: "Playful",
    description: "Fun, approachable, energetic vibes",
    preview: (
      <div className="w-full h-full flex items-center justify-center gap-2 p-2">
        <div className="w-8 h-8 bg-primary/40 rounded-full" />
        <div className="w-6 h-6 bg-primary/30 rounded-lg rotate-12" />
        <div className="w-10 h-10 bg-primary/20 rounded-2xl" />
      </div>
    ),
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional, trustworthy, established",
    preview: (
      <div className="w-full h-full grid grid-cols-3 gap-1 p-2">
        <div className="bg-primary/20 rounded" />
        <div className="bg-primary/30 rounded" />
        <div className="bg-primary/20 rounded" />
        <div className="col-span-3 h-2 bg-primary/40 rounded" />
      </div>
    ),
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic, unique, expressive design",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/40 to-primary/10 rounded-3xl rotate-45" />
      </div>
    ),
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary, cutting-edge, forward-thinking",
    preview: (
      <div className="w-full h-full flex flex-col gap-2 p-2">
        <div className="flex gap-2">
          <div className="flex-1 h-12 bg-primary/30 rounded-lg" />
          <div className="w-12 h-12 bg-primary/20 rounded-lg" />
        </div>
        <div className="h-8 bg-primary/10 rounded-lg" />
      </div>
    ),
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless, traditional, enduring appeal",
    preview: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
        <div className="h-1 w-16 bg-primary/30" />
        <div className="h-4 w-20 bg-primary/20 rounded-sm" />
        <div className="h-1 w-16 bg-primary/30" />
      </div>
    ),
  },
];

export default function StyleSelection({ data, updateData }: StyleSelectionProps) {
  const toggleStyle = (styleId: string) => {
    const current = data.selectedStyles || [];
    if (current.includes(styleId)) {
      updateData({ selectedStyles: current.filter((s) => s !== styleId) });
    } else {
      updateData({ selectedStyles: [...current, styleId] });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Which styles catch your eye?
        </h2>
        <p className="text-text-muted">
          Select all the design styles that appeal to you. This helps us understand your visual preferences.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {styles.map((style) => (
          <StyleCard
            key={style.id}
            id={style.id}
            name={style.name}
            description={style.description}
            preview={style.preview}
            isSelected={(data.selectedStyles || []).includes(style.id)}
            onToggle={() => toggleStyle(style.id)}
          />
        ))}
      </div>

      {(data.selectedStyles || []).length > 0 && (
        <p className="mt-6 text-sm text-text-muted text-center">
          {(data.selectedStyles || []).length} style{(data.selectedStyles || []).length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
