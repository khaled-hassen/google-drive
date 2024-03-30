import { createContext } from "react";

type GoogleApiContextType = {
  scriptsLoaded: boolean;
  login(onSuccess: () => void): void;
  logout(): void;
};

const GoogleApiContext = createContext<GoogleApiContextType>({
  scriptsLoaded: false,
  login() {},
  logout() {},
});
export default GoogleApiContext;
