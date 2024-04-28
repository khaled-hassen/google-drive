import { useCallback, useEffect, useRef } from "react";
import {
  AccessToken,
  getAccessToken,
  isLoggedIn,
  removeAccessToken,
  saveAccessToken,
} from "../lib/auth.ts";

/**
 * A custom React hook that manages authentication state.
 *
 * This hook starts a timer when the user logs in, which will automatically log the user out when the access token expires. It also provides a `handleLogin` function that can be used to log the user in and start the timer.
 *
 * @returns An object with a `handleLogin` function.
 *
 * @example
 * const { handleLogin } = useAuth();
 * handleLogin({ token: "abc123", expiresAt: new Date("2022-12-31T23:59:59Z") }); // Logs the user in and starts the timer
 */
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
