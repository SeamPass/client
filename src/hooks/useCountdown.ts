/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";

interface CountdownHook {
  isResendDisabled: boolean;
  countdown: number | null;
  formatCountdown: () => string;
  startCountdown: () => void;
}

export function useCountdown(initialCount: number = 60): CountdownHook {
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<any>(() => {
    const storedCountdown = localStorage.getItem("countdown");
    return storedCountdown ? parseInt(storedCountdown) : null;
  });

  useEffect(() => {
    // Effect to initialize or resume countdown based on stored value
    const storedCountdown = localStorage.getItem("countdown");
    if (storedCountdown) {
      const parsedCount = parseInt(storedCountdown);
      if (parsedCount > 0) {
        setIsResendDisabled(true);
      } else {
        localStorage.removeItem("countdown"); // Clean up if the stored countdown isn't valid for continuation
      }
    }
  }, []);

  useEffect(() => {
    let intervalId: any;

    if (isResendDisabled && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((current: any) => {
          const nextCount = current - 1;
          if (nextCount < 1) {
            clearInterval(intervalId);
            setIsResendDisabled(false);
            localStorage.removeItem("countdown");
            return 0;
          }
          return nextCount;
        });
      }, 1000);
    }

    // Ensure cleanup happens on component unmount or relevant dependency changes
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isResendDisabled, countdown]);

  useEffect(() => {
    // Update localStorage only when countdown is active and above zero
    if (countdown > 0) {
      localStorage.setItem("countdown", countdown.toString());
    }
  }, [countdown]);

  const formatCountdown = useCallback(() => {
    if (!countdown) {
      return "01:00"; // Default display when no active countdown
    }
    const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
    const seconds = String(countdown % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [countdown]);

  const startCountdown = useCallback(() => {
    setIsResendDisabled(true);
    setCountdown(initialCount);
    localStorage.setItem("countdown", initialCount.toString());
  }, [initialCount]);

  return { isResendDisabled, countdown, formatCountdown, startCountdown };
}
