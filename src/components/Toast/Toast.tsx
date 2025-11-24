import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import "./Toast.css";
import { useAutoDismiss } from "./useAutoDismiss";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // ms
  onClose?: () => void;
  showCloseButton?: boolean;
}

const DEFAULT_DURATION = 3000;

/**
 * Toast notification:
 * - appears in the bottom-right corner
 * - auto-dismisses after the given duration
 * - can be closed manually via close button
 * - slide/fade animation is handled by Framer Motion
 */
const Toast = ({
  message,
  type = "info",
  duration = DEFAULT_DURATION,
  onClose,
  showCloseButton = true,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  useAutoDismiss(duration, handleDismiss);

  if (!visible) return null;

  return (
    <motion.div
      className={`toast toast--${type}`}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="toast-content">{message}</div>

      {showCloseButton && (
        <button
          type="button"
          className="toast-close"
          aria-label="Close notification"
          onClick={handleDismiss}
        >
          ×
        </button>
      )}
    </motion.div>
  );
};

export default Toast;
