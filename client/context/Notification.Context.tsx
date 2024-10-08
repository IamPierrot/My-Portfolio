import React, { useState, useCallback, useMemo } from "react";
import Notification from "../components/Other/Notification";
import { NotificationContext } from "../hooks";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<{
    open: boolean;
    title: string;
    message: string;
    type?: "success" | "error";
  }>({ open: false, title: "", message: "" });

  const showNotification = useCallback(
    (title: string, message: string, type: "success" | "error" = "success") => {
      setNotification({ open: true, title, message, type });
      setTimeout(() => setNotification({ ...notification, open: false }), 3000);
    },
    [notification],
  );

  const memoizedNotification = useMemo(() => ({ ...notification }), [notification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        {...memoizedNotification}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </NotificationContext.Provider>
  );
};
