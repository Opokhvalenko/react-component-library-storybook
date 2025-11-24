import { useEffect } from "react";

/**
 * Small helper hook that is responsible only for
 * auto-dismissing a toast after the given duration.
 */
export function useAutoDismiss(duration: number | undefined, onDismiss: () => void) {
  useEffect(() => {
    if (!duration) return;

    const id = window.setTimeout(onDismiss, duration);

    return () => window.clearTimeout(id);
  }, [duration, onDismiss]);
}
