import { useContext } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

/**
 * A custom React Hook that provides a function to initiate Google login.
 *
 * This hook uses the `GoogleApiContext` to get the `login` function. It returns a function that, when called, initiates Google login and calls the provided `onSuccess` callback function when the login is successful.
 *
 * @param onSuccess - A callback function that is called when the login is successful.
 *
 * @returns A function that initiates Google login.
 *
 * @example
 * const initiateLogin = useGoogleLogin(() => console.log("Login successful"));
 * initiateLogin(); // Initiates Google login and logs "Login successful" when the login is successful
 */
export function useGoogleLogin(onSuccess: () => void) {
  const { login } = useContext(GoogleApiContext);
  return () => login(onSuccess);
}
