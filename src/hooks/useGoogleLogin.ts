import { useContext } from "react";
import GoogleApiContext, {
  OnSuccessCallback,
} from "../context/GoogleApiContext.ts";

type UseGoogleLoginParams = {
  onSuccess: OnSuccessCallback;
};

export function useGoogleLogin({ onSuccess }: UseGoogleLoginParams) {
  const { login } = useContext(GoogleApiContext);
  return () => login(onSuccess);
}
