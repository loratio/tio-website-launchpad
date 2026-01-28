"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="mt-8 flex justify-between items-center">
      <motion.button
        whileHover={{ scale: isFirstStep ? 1 : 1.02 }}
        whileTap={{ scale: isFirstStep ? 1 : 0.98 }}
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
          isFirstStep
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:text-primary hover:bg-gray-100"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        Previous
      </motion.button>

      {isLastStep ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
        >
          Submit Brief
          <Send className="w-5 h-5" />
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
