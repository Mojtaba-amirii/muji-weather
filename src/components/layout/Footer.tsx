import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-white px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
          © {currentYear} Muji Weather App. All rights reserved.
        </div>
        <nav className="flex gap-4">
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
