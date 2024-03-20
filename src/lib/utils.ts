import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateTimeAgo(fullDate: string): string {
  const currentDate = new Date();
  const pastDate = new Date(fullDate);

  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const millisecondsInOneMinute = 1000 * 60;
  const millisecondsInOneHour = millisecondsInOneMinute * 60;
  const millisecondsInOneDay = millisecondsInOneHour * 24;

  const minutesAgo = Math.floor(timeDifference / millisecondsInOneMinute);
  const hoursAgo = Math.floor((timeDifference % millisecondsInOneDay) / millisecondsInOneHour);
  const daysAgo = Math.floor((timeDifference % millisecondsInOneHour) / millisecondsInOneDay);

  if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
  } else {
    return "Just now";
  }
}


export function checkIfUserLikedPost(userId: string, likesArray: string[]) {
  const userHaveLikedPost = likesArray.find(likedUsersId => likedUsersId === userId)
  if(userHaveLikedPost) return true;
  return false;
}

