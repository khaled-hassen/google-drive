import { useContext } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

/**
 * A custom React Hook that provides a function to initiate Google logout.
 *
 * This hook uses the `GoogleApiContext` to get the `logout` function. It returns a function that, when called, initiates Google logout and calls the provided `onSuccess` callback function when the logout is successful.
 *
 * @param onSuccess - A callback function that is called when the logout is successful.
 *
 * @returns A function that initiates Google logout.
 *
 * @example
 * const initiateLogout = useGoogleLogout(() => console.log("Logout successful"));
 * initiateLogout(); // Initiates Google logout and logs "Logout successful" when the logout is successful
 */
export function useGoogleLogout(onSuccess: () => void) {
  const { logout } = useContext(GoogleApiContext);
  return () => {
    logout();
    onSuccess();
  };
}
