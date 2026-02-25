"use client";

import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";
import { WizardData } from "../WizardContainer";

interface SummaryProps {
  data: WizardData;
  goToStep: (step: number) => void;
}

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
      transition={{ delay: step * 0.02 }}
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

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="py-1.5">
      <span className="text-sm text-text-muted">{label}: </span>
      <span className="text-sm font-medium text-primary">
        {value || <span className="text-text-muted italic font-normal">Not provided</span>}
      </span>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  if (!items || items.length === 0) {
    return <span className="text-sm text-text-muted italic">None selected</span>;
  }
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
        >
          {item.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </span>
      ))}
    </div>
  );
}

const referralLabels: Record<string, string> = {
  mentioned: "Mentioned on key pages only",
  "dedicated-page": "Dedicated 'Referring Dentists' page",
  "form-and-page": "Referral form + dedicated page",
  "not-sure": "Not sure — please advise",
};

const visualDirectionLabels: Record<string, string> = {
  "keep-aligned": "Keep the current look closely aligned",
  "refresh-modernise": "Refresh and modernise (evolution)",
  "bigger-change": "Open to a bigger change (still on-brand)",
};

const styleNames: Record<string, string> = {
  minimal: "Minimal",
  bold: "Bold",
  elegant: "Elegant",
  playful: "Playful",
  corporate: "Corporate",
  creative: "Creative",
  modern: "Modern",
  classic: "Classic",
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
          Review your responses
        </h2>
        <p className="text-text-muted">
          Please review your answers below. Click &quot;Edit&quot; on any section to make changes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1: Gate Question */}
        <SectionCard title="Member Status" step={1} goToStep={goToStep}>
          <DataRow
            label="Building with us for the first time"
            value={data.isNewMember === "yes" ? "Yes — first build" : data.isNewMember === "no" ? "No — refreshing existing site" : null}
          />
        </SectionCard>

        {/* Step 2: Contacts & Sign-Off */}
        <SectionCard title="Contacts & Sign-Off" step={2} goToStep={goToStep}>
          <DataRow label="Practice name" value={data.practiceName} />
          <DataRow label="Primary contact" value={data.primaryContact} />
          <DataRow label="Primary email" value={data.primaryEmail} />
          <DataRow label="Primary phone" value={data.primaryPhone} />
          <DataRow label="Decision maker" value={data.decisionMaker} />
          {data.otherApprovers && <DataRow label="Other approvers" value={data.otherApprovers} />}
          <DataRow
            label="Ready to proceed"
            value={data.readyToProceed === "yes" ? "Yes" : data.readyToProceed === "no" ? "No" : null}
          />
          {data.readyToProceed === "no" && data.notReadyReason && (
            <DataRow label="What needs to happen first" value={data.notReadyReason} />
          )}
        </SectionCard>

        {/* Step 3: Locations & Enquiries - Only for new members */}
        {data.isNewMember === "yes" && (
          <SectionCard title="Locations & Enquiries" step={3} goToStep={goToStep}>
            <DataRow label="Number of locations" value={data.locationCount.toString()} />
            {data.locations.map((location, index) => (
              <div key={index} className="mt-3 p-3 bg-white/50 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">Location {index + 1}</p>
                <DataRow label="Name" value={location.name} />
                <DataRow label="Address" value={location.address} />
                <DataRow label="Phone" value={location.phone} />
                <DataRow label="Opening hours" value={location.openingHours} />
              </div>
            ))}
            <DataRow label="Enquiry emails" value={data.enquiryEmails} />
            <DataRow
              label="Accepts referrals"
              value={data.acceptsReferrals === "yes" ? "Yes" : data.acceptsReferrals === "no" ? "No" : null}
            />
            {data.acceptsReferrals === "yes" && (
              <DataRow label="Referral handling" value={referralLabels[data.referralHandling]} />
            )}
          </SectionCard>
        )}

        {/* Step 4: Goals & Homepage */}
        <SectionCard title="Goals & Homepage Priorities" step={4} goToStep={goToStep}>
          <DataRow
            label="Primary goal"
            value={data.primaryGoal === "other" ? data.primaryGoalOther : data.primaryGoal?.replace(/-/g, " ")}
          />
          <div className="py-1.5">
            <span className="text-sm text-text-muted">Top actions (max 3):</span>
            <TagList items={data.topActions} />
          </div>
          {data.topActions?.includes("other") && data.topActionsOther && (
            <DataRow label="Other action" value={data.topActionsOther} />
          )}
          <div className="py-1.5">
            <span className="text-sm text-text-muted">Homepage priorities (max 5):</span>
            <TagList items={data.homepagePriorities} />
          </div>
          {data.homepagePriorities?.includes("other") && data.homepagePrioritiesOther && (
            <DataRow label="Other priorities" value={data.homepagePrioritiesOther} />
          )}
        </SectionCard>

        {/* Step 5: Treatments & Consultation */}
        <SectionCard title="Treatments & Consultation" step={5} goToStep={goToStep}>
          <div className="py-1.5">
            <span className="text-sm text-text-muted">Treatments/services:</span>
            <TagList items={data.treatments} />
          </div>
          {data.treatments?.includes("other") && data.treatmentsOther && (
            <DataRow label="Other treatments" value={data.treatmentsOther} />
          )}
          <DataRow label="Consultation process" value={data.consultationProcess} />
          <DataRow
            label="Virtual consultations"
            value={
              data.virtualConsultations === "yes"
                ? "Yes"
                : data.virtualConsultations === "no"
                ? "No"
                : data.virtualConsultations === "want-to"
                ? "Not currently, but would like to"
                : null
            }
          />
          <DataRow label="Key USPs" value={data.keyUSPs} />
          <DataRow label="Payment/finance overview" value={data.paymentOverview} />
        </SectionCard>

        {/* Step 6: Audience & Competitors */}
        <SectionCard title="Audience, Areas & Competitors" step={6} goToStep={goToStep}>
          <DataRow label="Typical patient" value={data.typicalPatient} />
          {data.desiredPatients && <DataRow label="Want to attract more" value={data.desiredPatients} />}
          <DataRow label="Top areas" value={data.topAreas} />
          {data.competitors && <DataRow label="Competitors" value={data.competitors} />}
        </SectionCard>

        {/* Step 7: Design Styles */}
        <SectionCard title="Design Styles" step={7} goToStep={goToStep}>
          {(data.selectedStyles?.length || 0) > 0 ? (
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

        {/* Step 8: Brand Attributes */}
        <SectionCard title="Brand Attributes" step={8} goToStep={goToStep}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="text-sm">
              <span className="text-text-muted">Shape: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes?.geometric || 50, "Geometric", "Organic")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Style: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes?.abstract || 50, "Abstract", "Literal")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Era: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes?.classic || 50, "Classic", "Modern")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Tone: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes?.playful || 50, "Playful", "Serious")}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">Complexity: </span>
              <span className="font-medium text-primary">
                {getAttributeLabel(data.attributes?.simple || 50, "Simple", "Complex")}
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Step 9: Colour Exploration */}
        <SectionCard title="Colour Exploration" step={9} goToStep={goToStep}>
          {(data.selectedPalettes?.length || 0) > 0 || (data.customColors?.length || 0) > 0 ? (
            <div className="space-y-4">
              {data.selectedPalettes?.map((paletteId) => (
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
              {(data.customColors?.length || 0) > 0 && (
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
                  <span className="text-sm text-primary">Custom colours</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-text-muted text-sm italic">No palettes selected</p>
          )}
        </SectionCard>

        {/* Step 10: Brand & Tone */}
        <SectionCard title="Brand, Design & Content Style" step={10} goToStep={goToStep}>
          {(data.logoFiles?.length || 0) > 0 && (
            <div className="py-1.5">
              <span className="text-sm text-text-muted">Logo files:</span>
              <TagList items={data.logoFiles} />
            </div>
          )}
          <DataRow label="Aesthetic keywords" value={data.aestheticKeywords} />
          <DataRow label="First impression" value={data.firstImpression} />
          <DataRow label="Content style" value={`${data.contentStyle}/10 (1 = succinct, 10 = detailed)`} />
          <div className="py-1.5">
            <span className="text-sm text-text-muted">Tone of voice:</span>
            <TagList items={data.toneOfVoice} />
          </div>
          {data.wordsToAvoid && <DataRow label="Words/topics to avoid" value={data.wordsToAvoid} />}
        </SectionCard>

        {/* Step 11: Assets & Content */}
        <SectionCard title="Assets & Content Inputs" step={11} goToStep={goToStep}>
          <DataRow
            label="Provide staff imagery"
            value={data.provideStaffImagery?.replace(/-/g, " ")}
          />
          <DataRow
            label="Provide patient/lifestyle imagery"
            value={data.providePatientImagery?.replace(/-/g, " ")}
          />
          <DataRow
            label="Provide practice photos"
            value={data.providePracticePhotos?.replace(/-/g, " ")}
          />
          <DataRow
            label="Has testimonials to feature"
            value={data.hasTestimonials === "yes" ? "Yes" : data.hasTestimonials === "no" ? "No" : null}
          />
          {data.hasTestimonials === "yes" && data.testimonialsGuidance && (
            <DataRow label="Testimonials guidance" value={data.testimonialsGuidance} />
          )}
        </SectionCard>

        {/* Step 12: New Member Sections */}
        {data.isNewMember === "yes" && (
          <SectionCard title="New Member Details" step={12} goToStep={goToStep}>
            <DataRow
              label="Has existing website"
              value={data.hasExistingWebsite?.replace(/-/g, " ")}
            />
            {data.hasExistingWebsite === "yes" && (
              <>
                {data.currentWebsiteLikes && (
                  <DataRow label="Likes about current site" value={data.currentWebsiteLikes} />
                )}
                {data.currentWebsiteAvoid && (
                  <DataRow label="Wants to avoid" value={data.currentWebsiteAvoid} />
                )}
                {data.carryOverPages && (
                  <DataRow label="Pages/features to carry over" value={data.carryOverPages} />
                )}
              </>
            )}
            <DataRow
              label="Has brand guidelines"
              value={data.hasBrandGuidelines?.replace(/-/g, " ")}
            />
            {data.hasBrandGuidelines === "yes" && (data.brandGuidelinesFiles?.length || 0) > 0 && (
              <div className="py-1.5">
                <span className="text-sm text-text-muted">Brand guidelines files:</span>
                <TagList items={data.brandGuidelinesFiles} />
              </div>
            )}
          </SectionCard>
        )}

        {/* Step 12: Existing Member Sections */}
        {data.isNewMember === "no" && (
          <SectionCard title="Site Refresh Details" step={12} goToStep={goToStep}>
            <div className="py-1.5">
              <span className="text-sm text-text-muted">What has changed:</span>
              <TagList items={data.whatHasChanged} />
            </div>
            {(data.whatHasChanged?.length || 0) > 0 &&
              !data.whatHasChanged?.includes("nothing") &&
              data.changedDetails && (
                <DataRow label="Changed details" value={data.changedDetails} />
              )}
            {data.currentSiteLikes && (
              <DataRow label="Likes about current site" value={data.currentSiteLikes} />
            )}
            <DataRow label="Dislikes / wants improved" value={data.currentSiteDislikes} />
            {data.pagesRewriteRemoveAdd && (
              <DataRow label="Pages to rewrite/remove/add" value={data.pagesRewriteRemoveAdd} />
            )}
            <DataRow label="Visual direction" value={visualDirectionLabels[data.visualDirection]} />
          </SectionCard>
        )}
      </div>

      <div className="mt-8 p-4 bg-secondary/30 rounded-xl border border-secondary">
        <p className="text-sm text-primary">
          <strong>Ready to submit?</strong> Click the &quot;Submit&quot; button below to send
          your responses. We&apos;ll review everything ahead of your kick-off call and come
          prepared with recommendations and next steps.
        </p>
      </div>
    </div>
  );
}
