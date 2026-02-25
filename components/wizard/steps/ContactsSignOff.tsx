"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextInput, TextArea, RadioGroup } from "../ui/FormField";

interface ContactsSignOffProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export default function ContactsSignOff({ data, updateData }: ContactsSignOffProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Contacts &amp; Sign-Off
        </h2>
        <p className="text-text-muted">
          Tell us who we&apos;ll be working with and when you&apos;d like to get started.
        </p>
      </div>

      <div className="space-y-5">
        <FormField label="Practice name" required>
          <TextInput
            value={data.practiceName}
            onChange={(value) => updateData({ practiceName: value })}
            placeholder="e.g. Smile Orthodontics"
          />
        </FormField>

        <FormField label="Primary contact (name + role)" required>
          <TextInput
            value={data.primaryContact}
            onChange={(value) => updateData({ primaryContact: value })}
            placeholder="e.g. Dr Sarah Mitchell, Practice Owner"
          />
        </FormField>

        <FormField label="Primary contact email" required>
          <TextInput
            type="email"
            value={data.primaryEmail}
            onChange={(value) => updateData({ primaryEmail: value })}
            placeholder="sarah@smileortho.com"
          />
        </FormField>

        <FormField label="Primary contact phone number">
          <TextInput
            type="tel"
            value={data.primaryPhone}
            onChange={(value) => updateData({ primaryPhone: value })}
            placeholder="+44 7123 456789"
          />
        </FormField>

        <FormField label="Key decision maker (name + email)" required>
          <TextInput
            value={data.decisionMaker}
            onChange={(value) => updateData({ decisionMaker: value })}
            placeholder="e.g. Dr Sarah Mitchell, sarah@smileortho.com"
          />
        </FormField>

        <FormField label="Anyone else involved in approvals? (names + emails)">
          <TextArea
            value={data.otherApprovers}
            onChange={(value) => updateData({ otherApprovers: value })}
            placeholder="List anyone else who needs to review or approve website content..."
            rows={3}
          />
        </FormField>

        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Are you ready to proceed with this website project now?
            <span className="text-red-500 ml-1">*</span>
          </label>
          <RadioGroup
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            value={data.readyToProceed}
            onChange={(value) => updateData({ readyToProceed: value as "yes" | "no" })}
            layout="horizontal"
          />
        </div>

        {data.readyToProceed === "no" && (
          <FormField label="If not, what needs to happen before we start?" required>
            <TextArea
              value={data.notReadyReason}
              onChange={(value) => updateData({ notReadyReason: value })}
              placeholder="Let us know what's holding things up..."
              rows={3}
            />
          </FormField>
        )}
      </div>
    </div>
  );
}
