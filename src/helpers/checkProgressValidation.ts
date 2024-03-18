interface CheckValidationProps {
  values: {
    websiteUrl?: string;
    username?: string;
    password: string;
    email?: string;
    nickname?: string;
  };
  passwordMessage: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const checkValidation = ({
  values,
  setProgress,
  passwordMessage,
}: CheckValidationProps) => {
  const errors: { password?: string } = {};
  let strength = 0;
  if (values.password.length >= 8) strength++;
  if (/[A-Z]/.test(values.password)) strength++;
  if (/[a-z]/.test(values.password)) strength++;
  if (/[0-9]/.test(values.password)) strength++;
  if (/[^A-Za-z0-9]/.test(values.password)) strength++;

  const strengthScale = Math.min(Math.max(strength, 1), 6);
  setProgress(strengthScale);

  if (!values.password) {
    errors.password = passwordMessage;
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password must contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Password must contain at least one lowercase letter.";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Password must contain at least one number.";
  } else if (!/[^A-Za-z0-9]/.test(values.password)) {
    errors.password = "Password must contain at least one special character.";
  }

  return errors;
};
