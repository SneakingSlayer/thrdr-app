import { adjectives, animals } from "@/fixtures";

export const generateUsername = (str?: string): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  if (!str) {
    return `${adjective}-${animal}`.toLowerCase();
  }
  const firstName = str.split(" ")[0];
  return `${adjective}-${firstName}`.toLowerCase();
};
