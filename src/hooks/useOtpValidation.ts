// used for handling the Otp in the whole application
import { useState, useEffect } from "react";

const useOtpValidation = (initialOtp = "") => {
  const [otp, setOtp] = useState(initialOtp);
  const [error, setError] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      setError(""); // Clear error when OTP has the correct length
    }
  }, [otp]);

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits long");
      return false; // Indicate invalid submission
    }
    // Add additional submission logic here
    console.log("OTP is valid, proceed with submission:", otp);
    return true; // Indicate valid submission
  };

  return { otp, setOtp, error, handleSubmit };
};

export default useOtpValidation;
