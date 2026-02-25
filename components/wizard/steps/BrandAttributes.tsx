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

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Define your brand&apos;s personality
        </h2>
        <p className="text-text-muted">
          Use the sliders to indicate where your brand sits on each spectrum.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-5 bg-secondary/10 rounded-xl">
          <AttributeSlider
            leftLabel="Geometric"
            rightLabel="Organic"
            value={data.attributes.geometric}
            onChange={(value) => updateAttribute("geometric", value)}
          />
        </div>

        <div className="p-5 bg-secondary/10 rounded-xl">
          <AttributeSlider
            leftLabel="Abstract"
            rightLabel="Literal"
            value={data.attributes.abstract}
            onChange={(value) => updateAttribute("abstract", value)}
          />
        </div>

        <div className="p-5 bg-secondary/10 rounded-xl">
          <AttributeSlider
            leftLabel="Classic"
            rightLabel="Modern"
            value={data.attributes.classic}
            onChange={(value) => updateAttribute("classic", value)}
          />
        </div>

        <div className="p-5 bg-secondary/10 rounded-xl">
          <AttributeSlider
            leftLabel="Playful"
            rightLabel="Serious"
            value={data.attributes.playful}
            onChange={(value) => updateAttribute("playful", value)}
          />
        </div>

        <div className="p-5 bg-secondary/10 rounded-xl">
          <AttributeSlider
            leftLabel="Simple"
            rightLabel="Complex"
            value={data.attributes.simple}
            onChange={(value) => updateAttribute("simple", value)}
          />
        </div>
      </div>
    </div>
  );
}
