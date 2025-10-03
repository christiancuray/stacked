import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names and handle Tailwind CSS conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
