import Link from "next/link";

interface LogoProps {
  variant?: "default" | "light";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "default", showText = true, size = "md" }: LogoProps) {
  const primaryColor = variant === "default" ? "#2563eb" : "#ffffff";
  const accentColor = "#f59e0b";

  const sizes = {
    sm: { icon: 32, text: "text-xl" },
    md: { icon: 40, text: "text-2xl" },
    lg: { icon: 56, text: "text-3xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo Mark - Abstract "t" with creative flair */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:scale-105"
      >
        {/* Background circle */}
        <circle
          cx="24"
          cy="24"
          r="22"
          fill={primaryColor}
          opacity="0.1"
        />

        {/* Stylized "t" */}
        <path
          d="M24 10V38"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M16 18H32"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Creative accent dot */}
        <circle
          cx="36"
          cy="12"
          r="4"
          fill={accentColor}
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${text} font-semibold tracking-wide font-[family-name:var(--font-cormorant)]`}
            style={{ color: primaryColor }}
          >
            tio
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-light"
            style={{ color: variant === "default" ? "rgba(37, 99, 235, 0.6)" : "rgba(255, 255, 255, 0.7)" }}
          >
            Website LookBook
          </span>
        </div>
      )}
    </Link>
  );
}
