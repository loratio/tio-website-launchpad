"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextArea, RadioGroup, FileUpload } from "../ui/FormField";

interface NewMemberSectionsProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export default function NewMemberSections({ data, updateData }: NewMemberSectionsProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Your Starting Point
        </h2>
        <p className="text-text-muted">
          Since this is your first website build with us, we&apos;d like to understand your current situation.
        </p>
      </div>

      <div className="space-y-6">
        {/* SECTION NEW-1: Starting Point */}
        <div className="p-5 bg-secondary/10 rounded-xl space-y-5">
          <h3 className="font-semibold text-primary">Current Website</h3>

          <FormField label="Do you currently have an existing website live?" required>
            <RadioGroup
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "not-sure", label: "Not sure" },
              ]}
              value={data.hasExistingWebsite}
              onChange={(value) => updateData({ hasExistingWebsite: value })}
            />
          </FormField>

          {data.hasExistingWebsite === "yes" && (
            <>
              <FormField label="What do you like about your current website (if anything)?">
                <TextArea
                  value={data.currentWebsiteLikes}
                  onChange={(value) => updateData({ currentWebsiteLikes: value })}
                  placeholder="e.g. The colour scheme works well, patients find it easy to navigate, the before/after gallery gets good feedback..."
                  rows={3}
                />
              </FormField>

              <FormField label="What do you want to avoid repeating from your current website?">
                <TextArea
                  value={data.currentWebsiteAvoid}
                  onChange={(value) => updateData({ currentWebsiteAvoid: value })}
                  placeholder="e.g. The layout feels dated, the contact form doesn't work properly, pages load too slowly..."
                  rows={3}
                />
              </FormField>

              <FormField label="Are there any pages/features you definitely want to carry over?">
                <TextArea
                  value={data.carryOverPages}
                  onChange={(value) => updateData({ carryOverPages: value })}
                  placeholder="e.g. Keep the patient stories section, the FAQ page content is good, want to keep the blog..."
                  rows={3}
                />
              </FormField>
            </>
          )}
        </div>

        {/* SECTION NEW-2: Brand Materials */}
        <div className="p-5 bg-secondary/10 rounded-xl space-y-5">
          <h3 className="font-semibold text-primary">Brand Materials</h3>

          <FormField label="Do you have brand guidelines (fonts, colours, usage rules)?" required>
            <RadioGroup
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "not-sure", label: "Not sure" },
              ]}
              value={data.hasBrandGuidelines}
              onChange={(value) => updateData({ hasBrandGuidelines: value })}
            />
          </FormField>

          {data.hasBrandGuidelines === "yes" && (
            <FormField label="Upload brand guidelines (optional)">
              <FileUpload
                onChange={(files) => {
                  if (files) {
                    const fileNames = Array.from(files).map((f) => f.name);
                    updateData({ brandGuidelinesFiles: fileNames });
                  }
                }}
                accept=".pdf,.png,.jpg,.svg"
                currentFiles={data.brandGuidelinesFiles}
              />
            </FormField>
          )}
        </div>
      </div>
    </div>
  );
}
