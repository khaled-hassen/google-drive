import { createContext } from "react";

type GoogleApiContextType = {
  scriptsLoaded: boolean;
  login(onSuccess: () => void): void;
  logout(): void;
};

/**
 * A context for Google API related operations in a React application.
 *
 * This context provides a `scriptsLoaded` state that indicates whether the Google API scripts have been loaded, and `login` and `logout` functions for initiating Google login and logout.
 *
 * @property scriptsLoaded - A state that indicates whether the Google API scripts have been loaded.
 * @property login - A function that initiates Google login. It takes a callback function that is called when the login is successful.
 * @property logout - A function that initiates Google logout.
 *
 * @example
 * import GoogleApiContext from "./GoogleApiContext";
 *
 * // In a React component
 * const { scriptsLoaded, login, logout } = useContext(GoogleApiContext);
 *
 * // Use `scriptsLoaded`, `login`, and `logout` in the component
 */
const GoogleApiContext = createContext<GoogleApiContextType>({
  scriptsLoaded: false,
  login() {},
  logout() {},
});
export default GoogleApiContext;
