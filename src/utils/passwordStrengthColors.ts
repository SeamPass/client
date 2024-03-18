export const handlePasswordStrengthColors = (strength: string) => {
  switch (strength) {
    case "weak":
      return "#989B13";
      break;
    case "medium":
      return "#989B13";
      break;
    case "strong":
      return "#4CAF50";
      break;
    case "compromised":
      return "#BE2921";
      break;
    default:
      return "";
  }
};
