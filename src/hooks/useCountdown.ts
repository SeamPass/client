import { useState, useEffect, useCallback } from "react";

// Custom hook for countdown
export function useCountdown(initialCount: number = 180) {
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout> | null = null;

    if (isResendDisabled && countdown === null) {
      setCountdown(initialCount);
    } else if (isResendDisabled && countdown !== null && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((currentCountdown) => {
          if (currentCountdown === null) {
            return null;
          }
          return currentCountdown - 1;
        });
      }, 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
      setCountdown(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isResendDisabled, countdown]);

  const formatCountdown = useCallback(() => {
    if (countdown === null) {
      return "03:00";
    }
    const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
    const seconds = String(countdown % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [countdown]);

  const startCountdown = useCallback(() => {
    setIsResendDisabled(true);
  }, []);

  return { isResendDisabled, countdown, formatCountdown, startCountdown };
}
