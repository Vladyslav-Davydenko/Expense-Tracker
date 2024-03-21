import { useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  timeout = 500
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}
