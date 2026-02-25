"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextArea, RadioGroup } from "../ui/FormField";

interface AssetsContentProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const imageryOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function AssetsContent({ data, updateData }: AssetsContentProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Assets &amp; Content Inputs
        </h2>
        <p className="text-text-muted">
          Let us know what imagery and content you can provide.
        </p>
      </div>

      <div className="space-y-6">
        <FormField label="Will you provide new staff imagery?" required>
          <RadioGroup
            options={imageryOptions}
            value={data.provideStaffImagery}
            onChange={(value) => updateData({ provideStaffImagery: value })}
          />
        </FormField>

        <FormField label="Will you provide new patient/lifestyle imagery (and/or before-and-afters)?" required>
          <RadioGroup
            options={imageryOptions}
            value={data.providePatientImagery}
            onChange={(value) => updateData({ providePatientImagery: value })}
          />
        </FormField>

        <FormField label="Will you provide new practice photos (internal/external)?" required>
          <RadioGroup
            options={imageryOptions}
            value={data.providePracticePhotos}
            onChange={(value) => updateData({ providePracticePhotos: value })}
          />
        </FormField>

        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Do you have any existing testimonials or reviews you&apos;d like us to feature?
            <span className="text-red-500 ml-1">*</span>
          </label>
          <RadioGroup
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            value={data.hasTestimonials}
            onChange={(value) => updateData({ hasTestimonials: value as "yes" | "no" })}
            layout="horizontal"
          />
        </div>

        {data.hasTestimonials === "yes" && (
          <FormField
            label="Please paste links or provide guidance on which reviews/testimonials to feature"
            required
          >
            <TextArea
              value={data.testimonialsGuidance}
              onChange={(value) => updateData({ testimonialsGuidance: value })}
              placeholder="e.g. Link to Google reviews page, specific testimonials to highlight, or guidance on which patients to feature..."
              rows={4}
            />
          </FormField>
        )}
      </div>
    </div>
  );
}
