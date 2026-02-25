"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextArea, RadioGroup, CheckboxGroup } from "../ui/FormField";

interface ExistingMemberSectionsProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const whatChangedOptions = [
  { value: "locations", label: "Locations" },
  { value: "opening-hours", label: "Opening hours" },
  { value: "phone-numbers", label: "Phone numbers" },
  { value: "enquiry-emails", label: "Enquiry email addresses" },
  { value: "treatments", label: "Treatments offered" },
  { value: "consultation-process", label: "Consultation process" },
  { value: "finance-options", label: "Finance options" },
  { value: "team-members", label: "Team members" },
  { value: "brand", label: "Brand (logo/colours)" },
  { value: "nothing", label: "Nothing has changed" },
];

export default function ExistingMemberSections({ data, updateData }: ExistingMemberSectionsProps) {
  const handleWhatChangedUpdate = (selected: string[]) => {
    // If "nothing" is selected, clear other selections
    if (selected.includes("nothing") && !data.whatHasChanged.includes("nothing")) {
      updateData({ whatHasChanged: ["nothing"] });
    } else if (selected.includes("nothing") && selected.length > 1) {
      // If something else is selected while "nothing" is already selected, remove "nothing"
      updateData({ whatHasChanged: selected.filter((v) => v !== "nothing") });
    } else {
      updateData({ whatHasChanged: selected });
    }
  };

  const showChangedDetails =
    data.whatHasChanged.length > 0 && !data.whatHasChanged.includes("nothing");

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Site Refresh Details
        </h2>
        <p className="text-text-muted">
          Since we&apos;ve worked together before, let&apos;s find out what&apos;s changed and what you&apos;d like to improve.
        </p>
      </div>

      <div className="space-y-6">
        {/* SECTION EXIST-1: What's Changed? */}
        <div className="p-5 bg-secondary/10 rounded-xl space-y-5">
          <h3 className="font-semibold text-primary">What&apos;s Changed?</h3>

          <FormField
            label="Have any of the following changed since your current site went live?"
            required
          >
            <CheckboxGroup
              options={whatChangedOptions}
              selected={data.whatHasChanged}
              onChange={handleWhatChangedUpdate}
            />
          </FormField>

          {showChangedDetails && (
            <FormField
              label="Please provide the updated details for anything that has changed"
              required
            >
              <TextArea
                value={data.changedDetails}
                onChange={(value) => updateData({ changedDetails: value })}
                placeholder="List the specific changes for each item you selected above..."
                rows={5}
              />
            </FormField>
          )}
        </div>

        {/* SECTION EXIST-2: Site Feedback & Improvement Targets */}
        <div className="p-5 bg-secondary/10 rounded-xl space-y-5">
          <h3 className="font-semibold text-primary">Site Feedback &amp; Improvements</h3>

          <FormField label="What do you like about your current website?">
            <TextArea
              value={data.currentSiteLikes}
              onChange={(value) => updateData({ currentSiteLikes: value })}
              placeholder="e.g. The overall layout works well, patients find it easy to navigate, the colours match our brand..."
              rows={3}
            />
          </FormField>

          <FormField label="What do you dislike or want improved?" required>
            <TextArea
              value={data.currentSiteDislikes}
              onChange={(value) => updateData({ currentSiteDislikes: value })}
              placeholder="e.g. The homepage feels cluttered, the contact form is buried, we need better mobile experience..."
              rows={4}
            />
          </FormField>

          <FormField label="Are there specific pages you want rewritten, removed, or added?">
            <TextArea
              value={data.pagesRewriteRemoveAdd}
              onChange={(value) => updateData({ pagesRewriteRemoveAdd: value })}
              placeholder="e.g. Add a new page for adult Invisalign, remove the outdated blog, rewrite the About Us page..."
              rows={3}
            />
          </FormField>
        </div>

        {/* SECTION EXIST-3: Visual Direction */}
        <div className="p-5 bg-secondary/10 rounded-xl space-y-5">
          <h3 className="font-semibold text-primary">Visual Direction</h3>

          <FormField label="Visual direction preference" required>
            <RadioGroup
              options={[
                {
                  value: "keep-aligned",
                  label: "Keep the current look closely aligned",
                  description: "Minor tweaks only — we're happy with the overall design",
                },
                {
                  value: "refresh-modernise",
                  label: "Refresh and modernise (evolution)",
                  description: "Keep the core identity but update the look and feel",
                },
                {
                  value: "bigger-change",
                  label: "Open to a bigger change (still on-brand)",
                  description: "We're ready for a more significant visual overhaul",
                },
              ]}
              value={data.visualDirection}
              onChange={(value) => updateData({ visualDirection: value })}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
