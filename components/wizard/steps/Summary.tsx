"use client";

import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";
import { WizardData } from "../WizardContainer";

interface SummaryProps {
  data: WizardData;
  goToStep: (step: number) => void;
}

const styleNames: Record<string, string> = {
  minimal: "Minimal",
  bold: "Bold",
  elegant: "Elegant",
  playful: "Playful",
  corporate: "Corporate",
  creative: "Creative",
  modern: "Modern",
  classic: "Classic",
  tech: "Tech",
  organic: "Organic",
  luxury: "Luxury",
  editorial: "Editorial",
};

const paletteNames: Record<string, string> = {
  ocean: "Ocean Depths",
  forest: "Forest Walk",
  sunset: "Golden Sunset",
  earth: "Earth Tones",
  professional: "Professional Blue",
  warm: "Warm & Cozy",
  monochrome: "Monochrome",
  pastel: "Soft Pastels",
  bold: "Bold & Vibrant",
  minimal: "Minimal Clean",
};

const paletteColors: Record<string, string[]> = {
  ocean: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#03045E"],
  forest: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#1B4332"],
  sunset: ["#F72585", "#B5179E", "#7209B7", "#560BAD", "#3A0CA3"],
  earth: ["#BC6C25", "#DDA15E", "#FEFAE0", "#606C38", "#283618"],
  professional: ["#03045E", "#023E8A", "#0077B6", "#0096C7", "#48CAE4"],
  warm: ["#FF6B6B", "#FEC89A", "#FFD93D", "#C9B037", "#6B705C"],
  monochrome: ["#212529", "#495057", "#6C757D", "#ADB5BD", "#E9ECEF"],
  pastel: ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF"],
  bold: ["#E63946", "#F4A261", "#2A9D8F", "#264653", "#E9C46A"],
  minimal: ["#FFFFFF", "#F8F9FA", "#E9ECEF", "#212529", "#6C757D"],
};

const industryNames: Record<string, string> = {
  technology: "Technology",
  healthcare: "Healthcare",
  finance: "Finance & Banking",
  education: "Education",
  retail: "Retail & E-commerce",
  hospitality: "Hospitality & Travel",
  realestate: "Real Estate",
  legal: "Legal Services",
  creative: "Creative & Design",
  nonprofit: "Non-profit",
  food: "Food & Beverage",
  fitness: "Fitness & Wellness",
  other: "Other",
};

function SectionCard({
  title,
  step,
  goToStep,
  children,
}: {
  title: string;
  step: number;
  goToStep: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: step * 0.1 }}
      className="bg-gray-50 rounded-xl p-5"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button
          onClick={() => goToStep(step)}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
      </div>
      {children}
    </motion.div>
  );
}

function getAttributeLabel(value: number, leftLabel: string, rightLabel: string): string {
  if (value < 33) return leftLabel;
  if (value > 66) return rightLabel;
  return "Balanced";
}

export default function Summary({ data, goToStep }: SummaryProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-cormorant)]">
          Review your design brief
        </h2>
        <p className="text-gray-600">
          Review your selections below. Click &quot;Edit&quot; on any section to make changes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Design Styles */}
        <SectionCard title="Design Styles" step={1} goToStep={goToStep}>
          {data.selectedStyles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.selectedStyles.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {styleNames[style] || style}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">No styles selected</p>
          )}
        </SectionCard>

        {/* Brand Attributes */}
        <SectionCard title="Brand Attributes" step={2} goToStep={goToStep}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="text-sm">
              <span className="text-gray-500">Shape: </span>
              <span className="font-medium">
                {getAttributeLabel(data.attributes.geometric, "Geometric", "Organic")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Style: </span>
              <span className="font-medium">
                {getAttributeLabel(data.attributes.abstract, "Abstract", "Literal")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Era: </span>
              <span className="font-medium">
                {getAttributeLabel(data.attributes.classic, "Classic", "Modern")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Tone: </span>
              <span className="font-medium">
                {getAttributeLabel(data.attributes.playful, "Playful", "Serious")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Complexity: </span>
              <span className="font-medium">
                {getAttributeLabel(data.attributes.simple, "Simple", "Complex")}
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Color Palettes */}
        <SectionCard title="Color Exploration" step={3} goToStep={goToStep}>
          {data.selectedPalettes.length > 0 || data.customColors.length > 0 ? (
            <div className="space-y-4">
              {data.selectedPalettes.map((paletteId) => (
                <div key={paletteId} className="flex items-center gap-3">
                  <div className="flex">
                    {paletteColors[paletteId]?.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 first:rounded-l last:rounded-r"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-700">
                    {paletteNames[paletteId] || paletteId}
                  </span>
                </div>
              ))}
              {data.customColors.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {data.customColors.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-700">Custom colors</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">No palettes selected</p>
          )}
        </SectionCard>

        {/* Project Brief */}
        <SectionCard title="Project Details" step={4} goToStep={goToStep}>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Business Name: </span>
              <span className="text-sm font-medium">
                {data.projectInfo.businessName || <span className="text-gray-400 italic">Not provided</span>}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Industry: </span>
              <span className="text-sm font-medium">
                {industryNames[data.projectInfo.industry] || <span className="text-gray-400 italic">Not selected</span>}
              </span>
            </div>
            {data.projectInfo.targetAudience && (
              <div>
                <span className="text-sm text-gray-500">Target Audience: </span>
                <span className="text-sm">{data.projectInfo.targetAudience}</span>
              </div>
            )}
            {data.projectInfo.designGoals.length > 0 && (
              <div>
                <span className="text-sm text-gray-500">Design Goals: </span>
                <span className="text-sm capitalize">
                  {data.projectInfo.designGoals.join(", ")}
                </span>
              </div>
            )}
            {data.projectInfo.additionalNotes && (
              <div>
                <span className="text-sm text-gray-500">Notes: </span>
                <span className="text-sm">{data.projectInfo.additionalNotes}</span>
              </div>
            )}
            <div>
              <span className="text-sm text-gray-500">Contact Email: </span>
              <span className="text-sm font-medium">
                {data.projectInfo.contactEmail || <span className="text-gray-400 italic">Not provided</span>}
              </span>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Ready to submit?</strong> Click the &quot;Submit Brief&quot; button below to send
          your design preferences. We&apos;ll review your brief and get back to you with
          personalized recommendations.
        </p>
      </div>
    </div>
  );
}
