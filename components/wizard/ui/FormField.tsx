"use client";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  helperText?: string;
}

export default function FormField({ label, required, children, error, helperText }: FormFieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-primary mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {helperText && !error && <p className="mt-1.5 text-sm text-text-muted">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number";
}

export function TextInput({ value, onChange, placeholder, type = "text" }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-primary"
    />
  );
}

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
}

export function NumberInput({ value, onChange, min = 1, max = 20, placeholder }: NumberInputProps) {
  return (
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      min={min}
      max={max}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-primary"
    />
  );
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextArea({ value, onChange, placeholder, rows = 4 }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
    />
  );
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ value, onChange, options, placeholder }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => toggleOption(option.value)}
          className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
            selected.includes(option.value)
              ? "border-primary bg-primary/5 text-primary"
              : "border-secondary text-text-muted hover:border-primary/30"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

interface CheckboxGroupWithMaxProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
}

export function CheckboxGroupWithMax({ options, selected, onChange, maxSelections }: CheckboxGroupWithMaxProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else if (!maxSelections || selected.length < maxSelections) {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      {maxSelections && (
        <p className="text-sm text-text-muted mb-3">
          Select up to {maxSelections} ({selected.length}/{maxSelections} selected)
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const isDisabled = !isSelected && maxSelections !== undefined && selected.length >= maxSelections;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              disabled={isDisabled}
              className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 text-primary"
                  : isDisabled
                  ? "border-gray-100 text-gray-300 cursor-not-allowed"
                  : "border-secondary text-text-muted hover:border-primary/30"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface RadioGroupProps {
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  layout?: "vertical" | "horizontal";
}

export function RadioGroup({ options, value, onChange, layout = "vertical" }: RadioGroupProps) {
  return (
    <div className={layout === "horizontal" ? "flex flex-wrap gap-3" : "space-y-3"}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
            layout === "horizontal" ? "flex-1 min-w-fit" : "w-full"
          } ${
            value === option.value
              ? "border-primary bg-primary/5"
              : "border-secondary hover:border-primary/30"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                value === option.value ? "border-primary" : "border-gray-300"
              }`}
            >
              {value === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              )}
            </div>
            <div>
              <span className={`text-sm font-medium ${value === option.value ? "text-primary" : "text-primary"}`}>
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-text-muted mt-0.5">{option.description}</p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  leftLabel: string;
  rightLabel: string;
}

export function Slider({ value, onChange, min = 1, max = 10, leftLabel, rightLabel }: SliderProps) {
  return (
    <div className="space-y-3">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-sm text-text-muted">
        <span>{leftLabel}</span>
        <span className="font-medium text-primary">{value}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

interface FileUploadProps {
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  currentFiles?: string[];
}

export function FileUpload({ onChange, accept = ".png,.jpg,.svg,.eps,.pdf", multiple = true, currentFiles = [] }: FileUploadProps) {
  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-secondary rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-secondary/10">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-text-muted">
            <span className="font-medium text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-text-muted mt-1">{accept.replace(/\./g, "").toUpperCase()}</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => onChange(e.target.files)}
        />
      </label>
      {currentFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {currentFiles.map((file, i) => (
            <span key={i} className="px-3 py-1 bg-secondary/30 text-sm text-primary rounded-full">
              {file}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
