import { useState, useEffect } from "react";

const useOtpValidation = (initialOtp = "") => {
  const [otp, setOtp] = useState(initialOtp);
  const [error, setError] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      setError("");
    }
  }, [otp]);

  return { otp, setOtp, error, setError };
};

export default useOtpValidation;
