import React, { createContext, FC, useCallback, useState, useContext } from "react";
import api from "../services/api";

const LOCAL_STORAGE_TOKEN = "@gobarber:token";
const LOCAL_STORAGE_USER = "@gobarber:user";

interface SessionState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface SessionData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

export const SessionContext = createContext<SessionData>({} as SessionData);

export const SessionProvider: FC = ({ children }) => {

    const [data, setData] = useState<SessionState>(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        const user = localStorage.getItem(LOCAL_STORAGE_USER);

        if (token && user) {
            return {
                token,
                user: JSON.parse(user)
            }
        }

        return { } as SessionState;
    });

    const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
        
        const { data } = await api.post("/sessions", {
            email,
            password
        });

        const { token, user } = data; 
        
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_USER);

        setData({} as SessionState);
    }, [])

    return (
        <SessionContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = (): SessionData => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error("o useSession deve ser utilizado dentro de um SessionProvider.");
    }

    return context;
}