"use client";

import { WizardData, LocationData } from "../WizardContainer";
import FormField, { TextInput, TextArea, RadioGroup, Select, NumberInput } from "../ui/FormField";
import { Plus, Trash2 } from "lucide-react";

interface LocationsEnquiriesProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export default function LocationsEnquiries({ data, updateData }: LocationsEnquiriesProps) {
  const updateLocationCount = (count: number) => {
    const newCount = Math.max(1, Math.min(10, count));
    const newLocations = [...data.locations];

    while (newLocations.length < newCount) {
      newLocations.push({ name: "", address: "", phone: "", openingHours: "" });
    }
    while (newLocations.length > newCount) {
      newLocations.pop();
    }

    updateData({ locationCount: newCount, locations: newLocations });
  };

  const updateLocation = (index: number, field: keyof LocationData, value: string) => {
    const newLocations = [...data.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    updateData({ locations: newLocations });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Locations &amp; Enquiries
        </h2>
        <p className="text-text-muted">
          Tell us about your practice locations and how you&apos;d like to handle website enquiries.
        </p>
      </div>

      <div className="space-y-6">
        <FormField label="How many practice locations should the website include?" required>
          <NumberInput
            value={data.locationCount}
            onChange={updateLocationCount}
            min={1}
            max={10}
            placeholder="1"
          />
        </FormField>

        {data.locations.map((location, index) => (
          <div key={index} className="p-5 bg-secondary/10 rounded-xl space-y-4">
            <h3 className="font-semibold text-primary">
              Location {index + 1}
              {data.locationCount > 1 && ` of ${data.locationCount}`}
            </h3>

            <FormField label="Location name (as it should appear online)" required>
              <TextInput
                value={location.name}
                onChange={(value) => updateLocation(index, "name", value)}
                placeholder="e.g. Smile Orthodontics - City Centre"
              />
            </FormField>

            <FormField label="Full address (exact formatting)" required>
              <TextArea
                value={location.address}
                onChange={(value) => updateLocation(index, "address", value)}
                placeholder="123 High Street&#10;Manchester&#10;M1 2AB"
                rows={3}
              />
            </FormField>

            <FormField label="Primary phone number for this location" required>
              <TextInput
                type="tel"
                value={location.phone}
                onChange={(value) => updateLocation(index, "phone", value)}
                placeholder="+44 161 123 4567"
              />
            </FormField>

            <FormField label="Opening hours for this location" required>
              <TextArea
                value={location.openingHours}
                onChange={(value) => updateLocation(index, "openingHours", value)}
                placeholder="Monday–Friday: 9am–5pm&#10;Saturday: 9am–1pm&#10;Sunday: Closed"
                rows={3}
              />
            </FormField>
          </div>
        ))}

        <FormField
          label="Email address(es) that should receive website enquiries/appointment requests"
          required
          helperText="You can list multiple emails separated by commas"
        >
          <TextArea
            value={data.enquiryEmails}
            onChange={(value) => updateData({ enquiryEmails: value })}
            placeholder="appointments@smileortho.com, admin@smileortho.com"
            rows={2}
          />
        </FormField>

        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Do you accept dentist referrals?
            <span className="text-red-500 ml-1">*</span>
          </label>
          <RadioGroup
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            value={data.acceptsReferrals}
            onChange={(value) => updateData({ acceptsReferrals: value as "yes" | "no" })}
            layout="horizontal"
          />
        </div>

        {data.acceptsReferrals === "yes" && (
          <FormField label="How would you like referrals handled on the website?" required>
            <RadioGroup
              options={[
                { value: "mentioned", label: "Mentioned on key pages only" },
                { value: "dedicated-page", label: "Dedicated \"Referring Dentists\" page" },
                { value: "form-and-page", label: "Referral form + dedicated page" },
                { value: "not-sure", label: "Not sure — please advise" },
              ]}
              value={data.referralHandling}
              onChange={(value) => updateData({ referralHandling: value })}
            />
          </FormField>
        )}
      </div>
    </div>
  );
}
