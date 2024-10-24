import { createContext, useContext } from "react";

interface NotificationContextType {
    showNotification: (
        title: string,
        message: string,
        type?: "success" | "error",
    ) => void;
}


export const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined,
);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider",
        );
    }
    return context;
};
