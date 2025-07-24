import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-12 w-12 text-primary", className)}
  >
    <path d="M14.5 22a8 8 0 0 0-11-5.5 8 8 0 0 0-3.5 1" />
    <path d="M14.5 16.5a8 8 0 0 1-11 5.5 8 8 0 0 1-3.5-1" />
    <path d="M20 12a8 8 0 0 0-8-8 8 8 0 0 0-8 8" />
    <path d="M20 12h.5A2.5 2.5 0 0 1 23 14.5v0A2.5 2.5 0 0 1 20.5 17H20" />
    <path d="M16 12a4 4 0 1 0-8 0" />
  </svg>
);

export default Logo;
