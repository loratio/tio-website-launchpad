"use client";

interface AttributeSliderProps {
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export default function AttributeSlider({
  leftLabel,
  rightLabel,
  value,
  onChange,
}: AttributeSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-text-muted">{leftLabel}</span>
        <span className="text-text-muted">{rightLabel}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-center">
        <span className="text-xs text-primary font-medium px-2 py-1 bg-secondary/50 rounded-full">
          {value < 33 ? leftLabel : value > 66 ? rightLabel : "Balanced"}
        </span>
      </div>
    </div>
  );
}
