import { createContext } from "react";

export type OnSuccessCallbackParams = {
  access_token: string;
  expires_in: number;
};

export type OnSuccessCallback = (data: OnSuccessCallbackParams) => void;

type GoogleApiContextType = {
  login(onSuccess: OnSuccessCallback): void;
  logout(): void;
};

const GoogleApiContext = createContext<GoogleApiContextType>({
  login() {},
  logout() {},
});
export default GoogleApiContext;
