import { useCallback, useEffect, useRef } from "react";
import {
  AccessToken,
  getAccessToken,
  isLoggedIn,
  removeAccessToken,
  saveAccessToken,
} from "../lib/auth.ts";

export function useAuth() {
  const timer = useRef<number>();

  const startTimer = useCallback((expiresAt: Date) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      removeAccessToken();
      location.replace("/");
    }, expiresAt.getTime() - Date.now());
  }, []);

  const handleLogin = useCallback((accessToken: AccessToken) => {
    saveAccessToken(accessToken);
    startTimer(accessToken.expiresAt);
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      const { expiresAt } = getAccessToken()!;
      startTimer(expiresAt);
    } else removeAccessToken();

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return { handleLogin };
}
