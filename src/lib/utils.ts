import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function convertBytesToUnit(bytes: number) {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + units[i];
}

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

export function downloadFile(filename: string, link: string) {
  const downloadLink = document.createElement("a");
  downloadLink.href = link;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
