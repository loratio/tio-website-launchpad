"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextInput } from "../ui/FormField";

interface GetStartedProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export default function GetStarted({ data, updateData }: GetStartedProps) {
  const updateContactInfo = (key: keyof WizardData["contactInfo"], value: string) => {
    updateData({
      contactInfo: {
        ...data.contactInfo,
        [key]: value,
      },
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Let&apos;s get started
        </h2>
        <p className="text-text-muted">
          Tell us a bit about yourself and your practice so we can personalise your experience.
        </p>
      </div>

      <div className="space-y-5">
        <FormField label="Practice Name" required>
          <TextInput
            value={data.contactInfo.practiceName}
            onChange={(value) => updateContactInfo("practiceName", value)}
            placeholder="e.g. Smile Dental Clinic"
          />
        </FormField>

        <FormField label="Your Full Name" required>
          <TextInput
            value={data.contactInfo.fullName}
            onChange={(value) => updateContactInfo("fullName", value)}
            placeholder="e.g. Dr. Jane Smith"
          />
        </FormField>

        <FormField label="Your Email Address" required>
          <TextInput
            type="email"
            value={data.contactInfo.email}
            onChange={(value) => updateContactInfo("email", value)}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField label="Current Website URL">
          <TextInput
            value={data.contactInfo.currentWebsite}
            onChange={(value) => updateContactInfo("currentWebsite", value)}
            placeholder="https://www.yourpractice.com"
          />
        </FormField>

        <FormField label="Appointment Request Email" required>
          <TextInput
            type="email"
            value={data.contactInfo.appointmentEmail}
            onChange={(value) => updateContactInfo("appointmentEmail", value)}
            placeholder="appointments@yourpractice.com"
          />
          <p className="mt-1.5 text-sm text-text-muted">
            This is where appointment requests from your new website will be sent.
          </p>
        </FormField>
      </div>
    </div>
  );
}
