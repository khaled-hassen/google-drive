import { useContext } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

export function useGoogleLogout(onSuccess: () => void) {
  const { logout } = useContext(GoogleApiContext);
  return () => {
    logout();
    onSuccess();
  };
}
