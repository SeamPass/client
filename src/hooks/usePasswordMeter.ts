import zxcvbn from "zxcvbn";

// show strength of passwords

export const usePasswordStrengthMeter = (
  password: string,
  setPasswordStrength: React.Dispatch<React.SetStateAction<string>>,
  setStrengthColor: React.Dispatch<React.SetStateAction<string>>
) => {
  const handleShowPasswordStrength = () => {
    const evaluationResult = zxcvbn(password);
    let strengthMessage = "";
    let color = "";

    switch (evaluationResult.score) {
      case 0:
      case 1:
        strengthMessage = "Weak";
        color = "red";
        break;
      case 2:
        strengthMessage = "Fair";
        color = "orange";
        break;
      case 3:
        strengthMessage = "Good";
        color = "blue";
        break;
      case 4:
        strengthMessage = "Strong";
        color = "#4CAF50";
        break;
      default:
        strengthMessage = "Weak";
        color = "red";
    }

    setPasswordStrength(strengthMessage);
    setStrengthColor(color);
  };

  return { handleShowPasswordStrength };
};
