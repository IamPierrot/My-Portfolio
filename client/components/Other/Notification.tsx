import { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
}

export default memo(function Notification({
  open,
  onClose,
  title,
  message,
  type = "success",
}: NotificationProps) {
  const iconClasses =
    type === "success"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 right-0 w-80 max-w-sm scale-75 overflow-hidden rounded-lg bg-white shadow-xl"
        >
          <div className="flex items-start p-4">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconClasses}`}
            >
              {type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m9 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-base font-extrabold text-gray-900">
                {title}
              </h3>
              <div className="mt-1">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
