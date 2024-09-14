import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
interface NotificationProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
}

export default function Notification({
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed bottom-4 left-4 z-10"
    >
      <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div
              className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconClasses} sm:mx-0 sm:h-10 sm:w-10`}
            >
              <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <DialogTitle
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900"
              >
                {title}
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Close
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
