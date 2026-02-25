"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextArea } from "../ui/FormField";

interface AudienceCompetitorsProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export default function AudienceCompetitors({ data, updateData }: AudienceCompetitorsProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Audience, Areas &amp; Competitors
        </h2>
        <p className="text-text-muted">
          Help us understand who you&apos;re trying to reach and where they&apos;re coming from.
        </p>
      </div>

      <div className="space-y-6">
        <FormField label="How would you describe your typical patient?" required>
          <TextArea
            value={data.typicalPatient}
            onChange={(value) => updateData({ typicalPatient: value })}
            placeholder="e.g. Young professionals aged 25-40, busy parents with children needing braces, image-conscious adults looking for discreet options..."
            rows={4}
          />
        </FormField>

        <FormField label="Is there a type of patient you'd like to attract more of?">
          <TextArea
            value={data.desiredPatients}
            onChange={(value) => updateData({ desiredPatients: value })}
            placeholder="e.g. We'd like to see more adult Invisalign patients, or more families with multiple children needing treatment..."
            rows={3}
          />
        </FormField>

        <FormField
          label="Top areas/suburbs your patients come from"
          required
          helperText="List up to 5 in priority order"
        >
          <TextArea
            value={data.topAreas}
            onChange={(value) => updateData({ topAreas: value })}
            placeholder="1. Manchester City Centre&#10;2. Didsbury&#10;3. Chorlton&#10;4. Sale&#10;5. Altrincham"
            rows={5}
          />
        </FormField>

        <FormField
          label="Key competitors"
          helperText="Name + website if known; list up to 3"
        >
          <TextArea
            value={data.competitors}
            onChange={(value) => updateData({ competitors: value })}
            placeholder="1. ABC Orthodontics - www.abcortho.co.uk&#10;2. XYZ Braces - www.xyzbraces.com&#10;3. Smile Dental - www.smiledental.co.uk"
            rows={4}
          />
        </FormField>
      </div>
    </div>
  );
}
