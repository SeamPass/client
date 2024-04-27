import { colors } from "@/utils/colors";
import zxcvbn from "zxcvbn";

// show strength of passwords

export const usePasswordStrengthMeter = () => {
  const handleShowPasswordStrength = (password: string) => {
    const evaluationResult = zxcvbn(password);
    let strengthMessage = "";
    let color = "";

    switch (evaluationResult.score) {
      case 0:
      case 1:
        strengthMessage = "Weak";
        color = colors.weak;
        break;
      case 2:
        strengthMessage = "Fair";
        color = colors.fair;
        break;
      case 3:
      case 4:
        strengthMessage = "Strong";
        color = colors.strong;
        break;
      default:
        strengthMessage = "Weak";
        color = colors.weak;
    }

    return { strengthMessage, color };
  };

  return { handleShowPasswordStrength };
};
