"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  shortTitle: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden md:block" />

      {/* Active progress bar */}
      <motion.div
        className="absolute top-5 left-0 h-0.5 bg-primary hidden md:block"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex justify-between relative">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = step.id <= currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={`flex flex-col items-center group ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "#2563eb"
                    : isCurrent
                    ? "#2563eb"
                    : "#e5e7eb",
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors ${
                  isCompleted || isCurrent ? "text-white" : "text-gray-400"
                } ${isClickable && !isCurrent ? "group-hover:ring-4 group-hover:ring-primary/20" : ""}`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </motion.div>

              <span
                className={`mt-2 text-xs md:text-sm font-medium transition-colors ${
                  isCurrent
                    ? "text-primary"
                    : isCompleted
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
              >
                <span className="hidden md:inline">{step.title}</span>
                <span className="md:hidden">{step.shortTitle}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
