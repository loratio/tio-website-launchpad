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
    <div className="py-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600">{leftLabel}</span>
        <span className="text-sm font-medium text-gray-600">{rightLabel}</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />

      {/* Visual indicator */}
      <div className="flex justify-center mt-2">
        <div className="flex items-center gap-1">
          {[0, 25, 50, 75, 100].map((tick) => (
            <div
              key={tick}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                Math.abs(value - tick) < 12.5 ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
