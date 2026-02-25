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
      transition={{ delay: step * 0.05 }}
      className="bg-secondary/20 rounded-xl p-5"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-primary">{title}</h3>
        <button
          onClick={() => goToStep(step)}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary-light transition-colors"
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
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Review your design brief
        </h2>
        <p className="text-text-muted">
          Review your selections below. Click &quot;Edit&quot; on any section to make changes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Contact Info */}
        <SectionCard title="Contact Information" step={1} goToStep={goToStep}>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-text-muted">Practice Name: </span>
              <span className="text-sm font-medium text-primary">
                {data.contactInfo.practiceName || <span className="text-text-muted italic">Not provided</span>}
              </span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Full Name: </span>
              <span className="text-sm font-medium text-primary">
                {data.contactInfo.fullName || <span className="text-text-muted italic">Not provided</span>}
              </span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Email: </span>
              <span className="text-sm font-medium text-primary">
                {data.contactInfo.email || <span className="text-text-muted italic">Not provided</span>}
              </span>
            </div>
            {data.contactInfo.currentWebsite && (
              <div>
                <span className="text-sm text-text-muted">Current Website: </span>
                <span className="text-sm text-primary">{data.contactInfo.currentWebsite}</span>
              </div>
            )}
            <div>
              <span className="text-sm text-text-muted">Appointment Email: </span>
              <span className="text-sm font-medium text-primary">
                {data.contactInfo.appointmentEmail || <span className="text-text-muted italic">Not provided</span>}
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Design Styles */}
        <SectionCard title="Design Styles" step={2} goToStep={goToStep}>
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
            <p className="text-text-muted text-sm italic">No styles selected</p>
          )}
        </SectionCard>

        {/* Brand Attributes */}
        <SectionCard title="Brand Attributes" step={3} goToStep={goToStep}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="text-sm">
              <span className="text-text-muted">Shape: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes.geometric, "Geometric", "Organic")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Style: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes.abstract, "Abstract", "Literal")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Era: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes.classic, "Classic", "Modern")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Tone: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes.playful, "Playful", "Serious")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Complexity: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes.simple, "Simple", "Complex")}
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Color Palettes */}
        <SectionCard title="Color Exploration" step={4} goToStep={goToStep}>
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
                  <span className="text-sm text-primary">
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
                        className="w-6 h-6 rounded border border-secondary"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-primary">Custom colors</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-text-muted text-sm italic">No palettes selected</p>
          )}
        </SectionCard>

        {/* Project Brief */}
        <SectionCard title="Project Details" step={5} goToStep={goToStep}>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-text-muted">Business Name: </span>
              <span className="text-sm font-medium text-primary">
                {data.projectInfo.businessName || <span className="text-text-muted italic">Not provided</span>}
              </span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Industry: </span>
              <span className="text-sm font-medium text-primary">
                {industryNames[data.projectInfo.industry] || <span className="text-text-muted italic">Not selected</span>}
              </span>
            </div>
            {data.projectInfo.targetAudience && (
              <div>
                <span className="text-sm text-text-muted">Target Audience: </span>
                <span className="text-sm text-primary">{data.projectInfo.targetAudience}</span>
              </div>
            )}
            {data.projectInfo.designGoals.length > 0 && (
              <div>
                <span className="text-sm text-text-muted">Design Goals: </span>
                <span className="text-sm text-primary capitalize">
                  {data.projectInfo.designGoals.join(", ")}
                </span>
              </div>
            )}
            {data.projectInfo.additionalNotes && (
              <div>
                <span className="text-sm text-text-muted">Notes: </span>
                <span className="text-sm text-primary">{data.projectInfo.additionalNotes}</span>
              </div>
            )}
            {data.projectInfo.contactEmail && (
              <div>
                <span className="text-sm text-text-muted">Contact Email: </span>
                <span className="text-sm font-medium text-primary">
                  {data.projectInfo.contactEmail}
                </span>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <div className="mt-8 p-4 bg-secondary/30 rounded-xl border border-secondary">
        <p className="text-sm text-primary">
          <strong>Ready to submit?</strong> Click the &quot;Submit Brief&quot; button below to send
          your design preferences. We&apos;ll review your brief and get back to you with
          personalized recommendations.
        </p>
      </div>
    </div>
  );
}
