"use client";

import { WizardData } from "../WizardContainer";
import FormField, { TextInput, TextArea, Select, CheckboxGroup } from "../ui/FormField";

interface ProjectBriefProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance & Banking" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "hospitality", label: "Hospitality & Travel" },
  { value: "realestate", label: "Real Estate" },
  { value: "legal", label: "Legal Services" },
  { value: "creative", label: "Creative & Design" },
  { value: "nonprofit", label: "Non-profit" },
  { value: "food", label: "Food & Beverage" },
  { value: "fitness", label: "Fitness & Wellness" },
  { value: "other", label: "Other" },
];

const designGoalOptions = [
  { value: "professional", label: "Professional" },
  { value: "trustworthy", label: "Trustworthy" },
  { value: "innovative", label: "Innovative" },
  { value: "friendly", label: "Friendly" },
  { value: "luxury", label: "Luxury" },
  { value: "accessible", label: "Accessible" },
  { value: "bold", label: "Bold" },
  { value: "calm", label: "Calm" },
  { value: "energetic", label: "Energetic" },
];

export default function ProjectBrief({ data, updateData }: ProjectBriefProps) {
  const updateProjectInfo = (key: keyof WizardData["projectInfo"], value: string | string[]) => {
    updateData({
      projectInfo: {
        ...data.projectInfo,
        [key]: value,
      },
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-cormorant)]">
          Tell us about your project
        </h2>
        <p className="text-gray-600">
          Share details about your business and goals to help us understand your needs.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Business/Project Name" required>
            <TextInput
              value={data.projectInfo.businessName}
              onChange={(value) => updateProjectInfo("businessName", value)}
              placeholder="Enter your business name"
            />
          </FormField>

          <FormField label="Industry/Niche" required>
            <Select
              value={data.projectInfo.industry}
              onChange={(value) => updateProjectInfo("industry", value)}
              options={industries}
              placeholder="Select your industry"
            />
          </FormField>
        </div>

        <FormField label="Target Audience">
          <TextArea
            value={data.projectInfo.targetAudience}
            onChange={(value) => updateProjectInfo("targetAudience", value)}
            placeholder="Describe your ideal customers or users (e.g., age range, interests, profession)"
            rows={3}
          />
        </FormField>

        <FormField label="Design Goals">
          <p className="text-sm text-gray-500 mb-3">
            What feelings or impressions should your website convey?
          </p>
          <CheckboxGroup
            options={designGoalOptions}
            selected={data.projectInfo.designGoals}
            onChange={(selected) => updateProjectInfo("designGoals", selected)}
          />
        </FormField>

        <FormField label="Additional Notes">
          <TextArea
            value={data.projectInfo.additionalNotes}
            onChange={(value) => updateProjectInfo("additionalNotes", value)}
            placeholder="Any other details, inspirations, or specific requirements you'd like to share"
            rows={4}
          />
        </FormField>

        <FormField label="Contact Email" required>
          <TextInput
            type="email"
            value={data.projectInfo.contactEmail}
            onChange={(value) => updateProjectInfo("contactEmail", value)}
            placeholder="your@email.com"
          />
        </FormField>
      </div>
    </div>
  );
}
