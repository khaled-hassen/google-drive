import { useContext } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

export function useGoogleLogin(onSuccess: () => void) {
  const { login } = useContext(GoogleApiContext);
  return () => login(onSuccess);
}
