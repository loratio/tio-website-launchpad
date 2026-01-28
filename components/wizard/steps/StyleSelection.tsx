"use client";

import { WizardData } from "../WizardContainer";
import StyleCard from "../ui/StyleCard";

interface StyleSelectionProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const designStyles = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, simple, lots of whitespace",
    preview: (
      <div className="w-full h-full flex flex-col gap-2 p-4">
        <div className="h-1 w-16 bg-gray-300 rounded" />
        <div className="h-1 w-24 bg-gray-200 rounded" />
        <div className="flex-1" />
        <div className="h-8 w-20 border border-gray-300 rounded" />
      </div>
    ),
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong colors, large typography",
    preview: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-900 p-4">
        <div className="h-4 w-32 bg-yellow-400 rounded" />
        <div className="h-2 w-24 bg-white/40 rounded" />
      </div>
    ),
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Refined, sophisticated, serif fonts",
    preview: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-stone-100 p-4">
        <div className="h-px w-12 bg-stone-400" />
        <div className="h-3 w-20 bg-stone-700 rounded-sm" />
        <div className="h-px w-12 bg-stone-400" />
      </div>
    ),
  },
  {
    id: "playful",
    name: "Playful",
    description: "Fun, colorful, creative layouts",
    preview: (
      <div className="w-full h-full flex items-center justify-center gap-2 p-4">
        <div className="w-8 h-8 bg-pink-400 rounded-full" />
        <div className="w-6 h-6 bg-yellow-400 rounded-lg rotate-12" />
        <div className="w-10 h-10 bg-blue-400 rounded-xl -rotate-6" />
      </div>
    ),
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional, trustworthy, structured",
    preview: (
      <div className="w-full h-full flex flex-col gap-2 p-4 bg-slate-50">
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded" />
          <div className="flex-1 flex flex-col justify-center gap-1">
            <div className="h-1.5 w-20 bg-slate-300 rounded" />
          </div>
        </div>
        <div className="flex-1 border border-slate-200 rounded" />
      </div>
    ),
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic, unique, boundary-pushing",
    preview: (
      <div className="w-full h-full relative p-4 bg-gradient-to-br from-purple-100 to-orange-100">
        <div className="absolute top-4 left-4 w-16 h-8 bg-purple-500 rounded-full opacity-80" />
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-orange-400 rounded-lg rotate-45 opacity-80" />
      </div>
    ),
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary, trendy, cutting-edge",
    preview: (
      <div className="w-full h-full flex flex-col gap-3 p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="h-2 w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        <div className="flex gap-2">
          <div className="flex-1 h-12 bg-white rounded-xl shadow-sm" />
          <div className="flex-1 h-12 bg-white rounded-xl shadow-sm" />
        </div>
      </div>
    ),
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless, traditional, proven patterns",
    preview: (
      <div className="w-full h-full flex flex-col gap-2 p-4 bg-amber-50">
        <div className="h-2 w-24 bg-amber-900/60 rounded-sm" />
        <div className="h-1 w-32 bg-amber-800/30 rounded-sm" />
        <div className="flex-1 border border-amber-200 rounded mt-2" />
      </div>
    ),
  },
  {
    id: "tech",
    name: "Tech",
    description: "Futuristic, digital, data-driven",
    preview: (
      <div className="w-full h-full flex flex-col gap-2 p-4 bg-slate-900">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-400 rounded-full" />
        </div>
        <div className="flex-1 border border-slate-700 rounded bg-slate-800/50">
          <div className="h-1 w-3/4 bg-cyan-400/50 m-2 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    id: "organic",
    name: "Organic",
    description: "Natural, flowing, earth-inspired",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4 bg-green-50">
        <div className="w-20 h-20 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] bg-gradient-to-br from-green-300 to-green-500 opacity-80" />
      </div>
    ),
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Premium, exclusive, high-end feel",
    preview: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-900 p-4">
        <div className="h-0.5 w-8 bg-amber-400" />
        <div className="h-3 w-16 bg-amber-400/80 rounded-sm" />
        <div className="h-0.5 w-8 bg-amber-400" />
      </div>
    ),
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Magazine-style, content-focused",
    preview: (
      <div className="w-full h-full flex gap-2 p-4 bg-white">
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 w-full bg-gray-800 rounded-sm" />
          <div className="h-1 w-3/4 bg-gray-300 rounded-sm" />
          <div className="h-1 w-5/6 bg-gray-200 rounded-sm" />
        </div>
        <div className="w-12 h-full bg-gray-100 rounded" />
      </div>
    ),
  },
];

export default function StyleSelection({ data, updateData }: StyleSelectionProps) {
  const toggleStyle = (styleId: string) => {
    const current = data.selectedStyles;
    if (current.includes(styleId)) {
      updateData({ selectedStyles: current.filter((id) => id !== styleId) });
    } else {
      updateData({ selectedStyles: [...current, styleId] });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-cormorant)]">
          Which styles catch your eye?
        </h2>
        <p className="text-gray-600">
          Select all the design styles that appeal to you. You can choose multiple options.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {designStyles.map((style) => (
          <StyleCard
            key={style.id}
            id={style.id}
            name={style.name}
            description={style.description}
            preview={style.preview}
            isSelected={data.selectedStyles.includes(style.id)}
            onToggle={() => toggleStyle(style.id)}
          />
        ))}
      </div>

      {data.selectedStyles.length > 0 && (
        <p className="mt-6 text-sm text-gray-500">
          {data.selectedStyles.length} style{data.selectedStyles.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
