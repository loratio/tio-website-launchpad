"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextInput, RadioGroup, CheckboxGroupWithMax } from "../ui/FormField";

interface GoalsHomepageProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const primaryGoalOptions = [
  { value: "consultations", label: "More consultation bookings/enquiries" },
  { value: "invisalign", label: "More Invisalign®/clear aligner enquiries" },
  { value: "braces", label: "More braces enquiries" },
  { value: "child-teen", label: "More child/teen starts" },
  { value: "adult", label: "More adult patients" },
  { value: "other", label: "Other (please specify)" },
];

const topActionsOptions = [
  { value: "call", label: "Call the practice" },
  { value: "book-online", label: "Book online" },
  { value: "request-consultation", label: "Request a consultation" },
  { value: "cost-estimator", label: "Use a cost/finance estimator" },
  { value: "download-info", label: "Download info" },
  { value: "message-form", label: "Message via form" },
  { value: "find-location", label: "Find location & directions" },
  { value: "other", label: "Other" },
];

const homepagePriorityOptions = [
  { value: "invisalign", label: "Invisalign®" },
  { value: "clear-aligners", label: "Clear aligners (general)" },
  { value: "braces", label: "Braces" },
  { value: "kids-teens", label: "Kids & teens" },
  { value: "adult-treatment", label: "Adult treatment" },
  { value: "finance", label: "Finance/payment plans" },
  { value: "team", label: "Meet the team" },
  { value: "technology", label: "Technology" },
  { value: "before-afters", label: "Before & afters" },
  { value: "reviews", label: "Reviews" },
  { value: "locations", label: "Locations" },
  { value: "virtual-consults", label: "Virtual consults" },
  { value: "referrals", label: "Referrals" },
  { value: "other", label: "Other" },
];

export default function GoalsHomepage({ data, updateData }: GoalsHomepageProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Goals &amp; Homepage Priorities
        </h2>
        <p className="text-text-muted">
          Help us understand what you want your website to achieve.
        </p>
      </div>

      <div className="space-y-6">
        <FormField label="What is the primary goal of your new/refreshed website?" required>
          <RadioGroup
            options={primaryGoalOptions}
            value={data.primaryGoal}
            onChange={(value) => updateData({ primaryGoal: value })}
          />
        </FormField>

        {data.primaryGoal === "other" && (
          <FormField label="Please specify your primary goal" required>
            <TextInput
              value={data.primaryGoalOther}
              onChange={(value) => updateData({ primaryGoalOther: value })}
              placeholder="Describe your primary goal..."
            />
          </FormField>
        )}

        <FormField label="What top 3 actions do you want visitors to take?" required>
          <CheckboxGroupWithMax
            options={topActionsOptions}
            selected={data.topActions}
            onChange={(value) => updateData({ topActions: value })}
            maxSelections={3}
          />
        </FormField>

        {data.topActions.includes("other") && (
          <FormField label="Please describe the 'Other' action" required>
            <TextInput
              value={data.topActionsOther}
              onChange={(value) => updateData({ topActionsOther: value })}
              placeholder="Describe the action..."
            />
          </FormField>
        )}

        <FormField label="What should the homepage prioritise?" required>
          <CheckboxGroupWithMax
            options={homepagePriorityOptions}
            selected={data.homepagePriorities}
            onChange={(value) => updateData({ homepagePriorities: value })}
            maxSelections={5}
          />
        </FormField>

        {data.homepagePriorities.includes("other") && (
          <FormField label="Please specify any other homepage priorities" required>
            <TextInput
              value={data.homepagePrioritiesOther}
              onChange={(value) => updateData({ homepagePrioritiesOther: value })}
              placeholder="Describe other priorities..."
            />
          </FormField>
        )}
      </div>
    </div>
  );
}
