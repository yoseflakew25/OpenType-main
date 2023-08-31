import { useEffect, useState, useRef, useCallback } from "react";

export const useCountdown = (initialValue: number, interval?: number) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countdown, setCountdown] = useState(initialValue);

  const startCountdown = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) {
          return prev - (interval || 1000);
        }
        if (prev === 0)
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);

        return prev;
      });
    }, interval || 1000);
  }, [initialValue, interval]);

  const resetCountdown = useCallback(() => {
    clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    intervalRef.current = null;
    setCountdown(initialValue);
  }, [initialValue]);

  useEffect(() => {
    return () =>
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
  }, [interval]);

  return { countdown, startCountdown, resetCountdown };
};
