"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextInput, TextArea, RadioGroup, CheckboxGroup } from "../ui/FormField";

interface TreatmentsConsultationProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const treatmentOptions = [
  { value: "invisalign", label: "Invisalign®" },
  { value: "other-aligners", label: "Other clear aligners" },
  { value: "metal-braces", label: "Metal braces" },
  { value: "ceramic-braces", label: "Ceramic braces" },
  { value: "lingual-braces", label: "Lingual braces" },
  { value: "early-intervention", label: "Early intervention" },
  { value: "expanders", label: "Expanders" },
  { value: "retainers", label: "Retainers" },
  { value: "whitening", label: "Teeth whitening" },
  { value: "mouthguards", label: "Mouthguards" },
  { value: "orthognathic", label: "Orthognathic surgery support" },
  { value: "other", label: "Other" },
];

const virtualConsultOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "want-to", label: "Not currently, but we'd like to" },
];

export default function TreatmentsConsultation({ data, updateData }: TreatmentsConsultationProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Treatments &amp; Consultation Journey
        </h2>
        <p className="text-text-muted">
          Tell us about the services you offer and how you work with patients.
        </p>
      </div>

      <div className="space-y-6">
        <FormField label="Which treatments/services should be included?" required>
          <CheckboxGroup
            options={treatmentOptions}
            selected={data.treatments}
            onChange={(value) => updateData({ treatments: value })}
          />
        </FormField>

        {data.treatments.includes("other") && (
          <FormField label="Please list any other treatments/services" required>
            <TextArea
              value={data.treatmentsOther}
              onChange={(value) => updateData({ treatmentsOther: value })}
              placeholder="List additional treatments or services..."
              rows={3}
            />
          </FormField>
        )}

        <FormField
          label="Describe your initial consultation process"
          required
          helperText="What happens, who they see, timing, any fees"
        >
          <TextArea
            value={data.consultationProcess}
            onChange={(value) => updateData({ consultationProcess: value })}
            placeholder="e.g. Patients are seen by our treatment coordinator for a 30-minute appointment. We take photos and scans, discuss options, and provide a personalised treatment plan. There's no fee for the initial consultation..."
            rows={5}
          />
        </FormField>

        <FormField label="Do you offer virtual/remote consultations?" required>
          <RadioGroup
            options={virtualConsultOptions}
            value={data.virtualConsultations}
            onChange={(value) => updateData({ virtualConsultations: value })}
          />
        </FormField>

        <FormField
          label="What are your key USPs?"
          required
          helperText="What should we lean on most?"
        >
          <TextArea
            value={data.keyUSPs}
            onChange={(value) => updateData({ keyUSPs: value })}
            placeholder="e.g. Diamond Invisalign provider, specialist orthodontists only, in-house lab, flexible payment plans, evening appointments..."
            rows={4}
          />
        </FormField>

        <FormField
          label="Payment/finance overview (high-level only)"
          required
          helperText="E.g. 'low deposit options', 'interest-free plans', 'weekly/fortnightly payments', typical timeframes"
        >
          <TextArea
            value={data.paymentOverview}
            onChange={(value) => updateData({ paymentOverview: value })}
            placeholder="e.g. We offer 0% finance over 12 months, low deposits from £199, and monthly payments from £99. Patients can also spread payments over 24 months with a small interest charge..."
            rows={4}
          />
        </FormField>
      </div>
    </div>
  );
}
