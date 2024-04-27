import { colors } from "./colors";

export const handlePasswordStrengthColors = (strength: string) => {
  switch (strength) {
    case "weak":
      return colors.weak;
      break;
    case "fair":
      return colors.fair;
      break;
    case "strong":
      return colors.strong;
      break;
    case "compromised":
      return colors.compromised;
      break;
    default:
      return "";
  }
};
