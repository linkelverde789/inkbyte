import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as authApi from "./api";
import type { LoginPayload, RegisterPayload, User } from "./types";

export type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  sessionReady: Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const readyRef = useRef<{ resolve: () => void } | null>(null);

  const sessionReady = useMemo(
    () =>
      new Promise<void>((resolve) => {
        readyRef.current = { resolve };
      }),
    [],
  );

  const loadSession = useCallback(async () => {
    try {
      const data = await authApi.fetchMe();
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
      readyRef.current?.resolve();
    }
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  const login = useCallback(async (payload: LoginPayload) => {
    await authApi.login(payload);

    const me = await authApi.fetchMe();
    setUser(me.user);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const data = await authApi.register(payload);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* session cookies may already be cleared */
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      sessionReady,
      login,
      register,
      logout,
      refreshUser: loadSession,
    }),
    [user, loading, sessionReady, login, register, logout, loadSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("Auth context outside provider");
  }
  return ctx;
}
