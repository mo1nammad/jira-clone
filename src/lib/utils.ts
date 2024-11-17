import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length: number) {
  const charecter =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result: string = "";

  for (let index = 0; index < length; index++) {
    const randomIndex = Math.round(Math.random() * (charecter.length - 1));
    result += charecter.charAt(randomIndex);
  }

  return result;
}
