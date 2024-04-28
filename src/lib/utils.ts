import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

/**
 * A utility function that merges class names using the `clsx` and `twMerge` libraries.
 *
 * @param classes - An array of class names. Each class name can be a string, an array of strings, or an object where the keys are class names and the values are booleans indicating whether the class name should be included.
 *
 * @returns A string of merged class names.
 *
 * @example
 * cn('text-white', 'bg-red-500'); // Returns 'text-white bg-red-500'
 * cn(['text-white', 'bg-red-500']); // Returns 'text-white bg-red-500'
 * cn({ 'text-white': true, 'bg-red-500': false }); // Returns 'text-white'
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

/**
 * A utility function that converts bytes to a specific unit.
 *
 * @param bytes - The number of bytes to be converted.
 *
 * @returns A string representing the converted bytes in the appropriate unit.
 *
 * @example
 * convertBytesToUnit(1024); // Returns '1.00 KB'
 * convertBytesToUnit(1048576); // Returns '1.00 MB'
 * convertBytesToUnit(1073741824); // Returns '1.00 GB'
 */
export function convertBytesToUnit(bytes: number) {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + units[i];
}

/**
 * A utility function that formats a date string into a specific format.
 *
 * @param date - The date string to be formatted. If undefined, returns '-'.
 *
 * @returns A string representing the formatted date in the format: "MMM dd, yyyy, hh:mm AM/PM". If the date is undefined, returns '-'.
 *
 * @example
 * formatDate("2022-03-01T10:30:00Z"); // Returns 'Mar 01, 2022, 10:30 AM'
 * formatDate(undefined); // Returns '-'
 */
export function formatDate(date: string | undefined) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

/**
 * A utility function that initiates a file download.
 *
 * @param filename - The name of the file to be downloaded.
 * @param link - The URL of the file to be downloaded.
 *
 * @example
 * downloadFile("example.txt", "https://example.com/example.txt"); // Initiates the download of 'example.txt' from 'https://example.com/example.txt'
 */
export function downloadFile(filename: string, link: string) {
  const downloadLink = document.createElement("a");
  downloadLink.href = link;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
