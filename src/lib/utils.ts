import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateTimeAgo(fullDate: string): string {
  const currentDate = new Date();
  const pastDate = new Date(fullDate);

  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const millisecondsInOneHour = 1000 * 60 * 60;
  const millisecondsInOneDay = millisecondsInOneHour * 24;

  const daysAgo = Math.floor(timeDifference / millisecondsInOneDay);
  const hoursAgo = Math.floor((timeDifference % millisecondsInOneDay) / millisecondsInOneHour);

  if (daysAgo > 0) {
      return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  } else if (hoursAgo > 0) {
      return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  } else {
      return "Less than an hour ago";
  }
}