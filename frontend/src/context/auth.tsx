import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const accessTokenRef = { current: null as string | null };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("UseAuth must be used inside of a <AuthProivder>");
  }
  return ctx;
}
