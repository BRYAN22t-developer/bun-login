import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const accessTokenRef = { current: null as string | null };

export const updateReactToken = { current: (token: string | null) => {} };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    accessTokenRef.current = accessToken;
    updateReactToken.current = setAccessToken;
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside of an <AuthProvider>");
  }
  return ctx;
}
