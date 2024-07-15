import React, { createContext, FC, useContext, useCallback, useState } from "react";
import ToastContainer from "../components/ToastContainer";
import { uuid } from "uuidv4";

export interface ToastMessage {
    id: string;
    type?: "info" | "success" | "danger";
    title: string;
    description?: string;
}

interface ToastContextData {
    addToast(data: Omit<ToastMessage, "id">): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: FC = ({ children }) => {

    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, "id">): void => {
        setMessages(state => [
            ...state,
            { 
                id: uuid(),
                type,
                title,
                description
            }
        ]);        
    }, []);

    const removeToast = useCallback((id: string) => {
        setMessages(state => state.filter(toast => toast.id !== id));      
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("o useToast deve ser utilizado dentro de um ToastProvider");
    }

    return context;
}