"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextInput, TextArea, Slider, CheckboxGroupWithMax, FileUpload } from "../ui/FormField";

interface BrandDesignProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const toneOptions = [
  { value: "warm-reassuring", label: "Warm & reassuring" },
  { value: "professional-expert", label: "Professional & expert-led" },
  { value: "modern-friendly", label: "Modern & friendly" },
  { value: "calm-premium", label: "Calm & premium" },
  { value: "straight-talking", label: "Straight-talking & practical" },
  { value: "family-focused", label: "Family-focused" },
  { value: "motivating-upbeat", label: "Motivating & upbeat" },
  { value: "lightly-witty", label: "Lightly witty (subtle)" },
];

export default function BrandDesign({ data, updateData }: BrandDesignProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Brand, Design &amp; Content Style
        </h2>
        <p className="text-text-muted">
          Help us capture the look, feel and voice of your brand.
        </p>
      </div>

      <div className="space-y-6">
        <FormField label="Upload your logo files (if available)">
          <FileUpload
            onChange={(files) => {
              if (files) {
                const fileNames = Array.from(files).map((f) => f.name);
                updateData({ logoFiles: fileNames });
              }
            }}
            accept=".png,.jpg,.svg,.eps"
            currentFiles={data.logoFiles}
          />
        </FormField>

        <FormField
          label="Aesthetic keywords for your website"
          required
          helperText="3–8 words that describe the look and feel you're after"
        >
          <TextInput
            value={data.aestheticKeywords}
            onChange={(value) => updateData({ aestheticKeywords: value })}
            placeholder="e.g. clean, modern, welcoming, professional, vibrant"
          />
        </FormField>

        <FormField
          label="When someone lands on your website, what should they immediately think/feel?"
          required
        >
          <TextArea
            value={data.firstImpression}
            onChange={(value) => updateData({ firstImpression: value })}
            placeholder="e.g. 'This practice looks professional and trustworthy. They clearly know what they're doing, and I feel confident booking a consultation.'"
            rows={4}
          />
        </FormField>

        <FormField label="Content reading style preference" required>
          <Slider
            value={data.contentStyle}
            onChange={(value) => updateData({ contentStyle: value })}
            min={1}
            max={10}
            leftLabel="Simplistic & succinct"
            rightLabel="Technical & descriptive"
          />
        </FormField>

        <FormField label="Tone of voice" required>
          <CheckboxGroupWithMax
            options={toneOptions}
            selected={data.toneOfVoice}
            onChange={(value) => updateData({ toneOfVoice: value })}
            maxSelections={3}
          />
        </FormField>

        <FormField label="Any words/phrases/topics to avoid?">
          <TextArea
            value={data.wordsToAvoid}
            onChange={(value) => updateData({ wordsToAvoid: value })}
            placeholder="e.g. Avoid using 'cheap', 'discount', or overly clinical language. Don't mention competitor names..."
            rows={3}
          />
        </FormField>
      </div>
    </div>
  );
}
