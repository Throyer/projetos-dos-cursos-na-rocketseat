import React, {
  createContext,
  FC,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import storage from "@react-native-community/async-storage";
import api from "../services/api";

const KEY_STORAGE_TOKEN = "@gobarber:token";
const KEY_STORAGE_USER = "@gobarber:user";

interface SessionState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SessionData {
  user?: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const SessionContext = createContext<SessionData>({} as SessionData);

export const SessionProvider: FC = ({ children }) => {
  const [data, setData] = useState<SessionState>({} as SessionState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [TOKEN_STORAGE, USER_STORAGE] = await storage.multiGet([
        KEY_STORAGE_TOKEN,
        KEY_STORAGE_USER,
      ]);

      const [, token] = TOKEN_STORAGE;
      const [, user] = USER_STORAGE;

      if (token && user) {
        setData({
          token,
          user: JSON.parse(user),
        });
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const { data } = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = data;

    await storage.multiSet([
      [KEY_STORAGE_TOKEN, token],
      [KEY_STORAGE_USER, JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await storage.multiRemove([KEY_STORAGE_TOKEN, KEY_STORAGE_USER]);

    setData({} as SessionState);
  }, []);

  return (
    <SessionContext.Provider
      value={{ user: data.user, signIn, signOut, loading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionData => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      "o useSession deve ser utilizado dentro de um SessionProvider."
    );
  }

  return context;
};
