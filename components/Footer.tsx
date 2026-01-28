import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo variant="light" size="sm" />

          <p className="text-gray-400 text-sm font-light text-center">
            Discover your website&apos;s visual identity through an interactive design experience.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/brief" className="hover:text-white transition-colors">
              Start Brief
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} tio Website LookBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
