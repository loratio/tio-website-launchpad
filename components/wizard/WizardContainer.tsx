"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "./StepIndicator";
import StepNavigation from "./StepNavigation";
import GetStarted from "./steps/GetStarted";
import StyleSelection from "./steps/StyleSelection";
import BrandAttributes from "./steps/BrandAttributes";
import ColorExploration from "./steps/ColorExploration";
import ProjectBrief from "./steps/ProjectBrief";
import Summary from "./steps/Summary";

export interface WizardData {
  // Step 1: Contact Info
  contactInfo: {
    practiceName: string;
    fullName: string;
    email: string;
    currentWebsite: string;
    appointmentEmail: string;
  };

  // Step 2: Design Styles
  selectedStyles: string[];

  // Step 3: Brand Attributes
  attributes: {
    geometric: number;
    abstract: number;
    classic: number;
    playful: number;
    simple: number;
  };

  // Step 4: Colors
  selectedPalettes: string[];
  customColors: string[];

  // Step 5: Project Brief
  projectInfo: {
    businessName: string;
    industry: string;
    targetAudience: string;
    designGoals: string[];
    additionalNotes: string;
    contactEmail: string;
  };
}

const initialData: WizardData = {
  contactInfo: {
    practiceName: "",
    fullName: "",
    email: "",
    currentWebsite: "",
    appointmentEmail: "",
  },
  selectedStyles: [],
  attributes: {
    geometric: 50,
    abstract: 50,
    classic: 50,
    playful: 50,
    simple: 50,
  },
  selectedPalettes: [],
  customColors: [],
  projectInfo: {
    businessName: "",
    industry: "",
    targetAudience: "",
    designGoals: [],
    additionalNotes: "",
    contactEmail: "",
  },
};

const STORAGE_KEY = "tio-wizard-data";

const steps = [
  { id: 1, title: "Get Started", shortTitle: "Start" },
  { id: 2, title: "Design Styles", shortTitle: "Styles" },
  { id: 3, title: "Brand Attributes", shortTitle: "Attributes" },
  { id: 4, title: "Color Exploration", shortTitle: "Colors" },
  { id: 5, title: "Project Brief", shortTitle: "Brief" },
  { id: 6, title: "Review & Submit", shortTitle: "Review" },
];

export default function WizardContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
      } catch {
        // Invalid data, use initial
      }
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 6) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send data to a server
    console.log("Submitting wizard data:", data);
    setIsSubmitted(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleReset = () => {
    setData(initialData);
    setCurrentStep(1);
    setIsSubmitted(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Brief Submitted Successfully!
          </h2>
          <p className="text-text-muted mb-8">
            Thank you for completing your design brief. We&apos;ll review your preferences
            and get back to you soon with personalized recommendations.
          </p>
          <button
            onClick={handleReset}
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-light transition-colors font-medium"
          >
            Create Another Brief
          </button>
        </motion.div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <GetStarted data={data} updateData={updateData} />;
      case 2:
        return <StyleSelection data={data} updateData={updateData} />;
      case 3:
        return <BrandAttributes data={data} updateData={updateData} />;
      case 4:
        return <ColorExploration data={data} updateData={updateData} />;
      case 5:
        return <ProjectBrief data={data} updateData={updateData} />;
      case 6:
        return <Summary data={data} goToStep={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
        />

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-secondary/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        <StepNavigation
          currentStep={currentStep}
          totalSteps={6}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
