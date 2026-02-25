"use client";

import { WizardData } from "../WizardContainer";
import { RadioGroup } from "../ui/FormField";

interface GateQuestionProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export default function GateQuestion({ data, updateData }: GateQuestionProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Website Build Kick-Off
        </h2>
        <p className="text-text-muted">
          Let&apos;s start by understanding where you are in your journey with us.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Are you building your website with us for the first time?
            <span className="text-red-500 ml-1">*</span>
          </label>
          <RadioGroup
            options={[
              {
                value: "yes",
                label: "Yes — this is our first website build with you",
                description: "We'll gather some additional information about your starting point and brand materials.",
              },
              {
                value: "no",
                label: "No — we're refreshing an existing site with you",
                description: "We'll ask what's changed and what you'd like to improve.",
              },
            ]}
            value={data.isNewMember}
            onChange={(value) => updateData({ isNewMember: value as "yes" | "no" })}
          />
        </div>
      </div>
    </div>
  );
}
