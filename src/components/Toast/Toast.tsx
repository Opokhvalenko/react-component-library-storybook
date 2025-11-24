import { useEffect, useState } from "react";
import "./Toast.css";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // ms
  onClose?: () => void;
  showCloseButton?: boolean;
}

/**
 * Toast notification:
 * - bottom-right position
 * - auto-dismiss after duration
 * - simple fade/slide-in animation
 */
const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  showCloseButton = true,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => window.clearTimeout(timeoutId);
  }, [duration, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast-content">
        <span>{message}</span>
        {showCloseButton && (
          <button
            type="button"
            className="toast-close"
            aria-label="Close notification"
            onClick={() => {
              setVisible(false);
              if (onClose) onClose();
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
