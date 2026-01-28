"use client";

import { WizardData } from "../WizardContainer";
import AttributeSlider from "../ui/AttributeSlider";

interface BrandAttributesProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export default function BrandAttributes({ data, updateData }: BrandAttributesProps) {
  const updateAttribute = (key: keyof WizardData["attributes"], value: number) => {
    updateData({
      attributes: {
        ...data.attributes,
        [key]: value,
      },
    });
  };

  // Generate a visual preview based on current attributes
  const PreviewBox = () => {
    const { geometric, abstract, classic, playful, simple } = data.attributes;

    // Calculate visual properties based on sliders
    const borderRadius = geometric < 50 ? `${4 + (50 - geometric) / 5}px` : `${4 + (geometric - 50) / 2}px`;
    const bgOpacity = abstract / 100;
    const rotation = playful < 50 ? (50 - playful) / 10 : 0;
    const elements = Math.ceil(simple / 25) + 1;
    const colorIntensity = classic < 50 ? 0.3 + (50 - classic) / 100 : 0.3 + (classic - 50) / 200;

    return (
      <div
        className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden relative"
        style={{ borderRadius }}
      >
        {Array.from({ length: elements }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: 40 + i * 10,
              height: 40 + i * 10,
              backgroundColor: `rgba(37, 99, 235, ${colorIntensity - i * 0.1})`,
              borderRadius: geometric > 50 ? "50%" : `${8 - (50 - geometric) / 10}px`,
              transform: `rotate(${rotation + i * 15}deg) translate(${i * 20}px, ${i * 10}px)`,
              opacity: bgOpacity,
            }}
          />
        ))}
        <div
          className="relative z-10 text-center"
          style={{
            fontFamily: classic > 50 ? "serif" : "sans-serif",
            fontWeight: playful > 50 ? 400 : 600,
          }}
        >
          <div className="text-lg text-gray-700">Preview</div>
          <div className="text-xs text-gray-500">Based on your selections</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-cormorant)]">
          Define your brand&apos;s personality
        </h2>
        <p className="text-gray-600">
          Adjust the sliders to describe where your brand falls on each spectrum.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <AttributeSlider
            leftLabel="Geometric"
            rightLabel="Organic"
            value={data.attributes.geometric}
            onChange={(value) => updateAttribute("geometric", value)}
          />

          <AttributeSlider
            leftLabel="Abstract"
            rightLabel="Literal"
            value={data.attributes.abstract}
            onChange={(value) => updateAttribute("abstract", value)}
          />

          <AttributeSlider
            leftLabel="Classic"
            rightLabel="Modern"
            value={data.attributes.classic}
            onChange={(value) => updateAttribute("classic", value)}
          />

          <AttributeSlider
            leftLabel="Playful"
            rightLabel="Serious"
            value={data.attributes.playful}
            onChange={(value) => updateAttribute("playful", value)}
          />

          <AttributeSlider
            leftLabel="Simple"
            rightLabel="Complex"
            value={data.attributes.simple}
            onChange={(value) => updateAttribute("simple", value)}
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Live Preview</h3>
          <PreviewBox />
          <p className="text-xs text-gray-500 mt-3 text-center">
            This preview updates as you adjust the sliders
          </p>
        </div>
      </div>
    </div>
  );
}
