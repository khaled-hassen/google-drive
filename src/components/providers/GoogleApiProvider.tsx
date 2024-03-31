import React, { useEffect, useRef, useState } from "react";
import GoogleApiContext from "../../context/GoogleApiContext.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import {
  getAccessToken,
  isLoggedIn,
  removeAccessToken,
} from "../../lib/auth.ts";

type Props = {
  clientId: string;
  apiKey: string;
  discoveryDocs: string[];
  scopes: string[];
  children: React.ReactNode;
};

const GoogleApiProvider: React.FC<Props> = ({
  clientId,
  scopes,
  discoveryDocs,
  apiKey,
  children,
}) => {
  const tokenClient = useRef<google.accounts.oauth2.TokenClient>();
  const [isGisLoaded, setIsGisLoaded] = useState(false);
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const { handleLogin } = useAuth();

  function gapiLoaded() {
    gapi.load("client", async () => {
      await gapi.client.init({ apiKey, discoveryDocs });
      setIsGapiLoaded(true);

      if (isLoggedIn()) {
        const accessToken = getAccessToken()!;
        gapi.client.setToken({ access_token: accessToken.token });
      }
    });
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    tokenClient.current = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: scopes.join(" "),
      callback: () => {},
    });
    setIsGisLoaded(true);
  }

  /**
   *  Sign in the user upon button click.
   */
  function login(
    onSuccess: (data: google.accounts.oauth2.TokenResponse) => void,
  ) {
    if (tokenClient.current) {
      // @ts-ignore
      tokenClient.current.callback = (
        data: google.accounts.oauth2.TokenResponse,
      ) => {
        const expiresAt = new Date(
          Date.now() + parseInt(data.expires_in) * 1000,
        );
        handleLogin({
          token: data.access_token,
          expiresAt: expiresAt,
        });
        onSuccess(data);
      };
    }

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.current?.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.current?.requestAccessToken({ prompt: "" });
    }
  }

  /**
   *  Sign out the user upon button click.
   */
  function logout() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token, () => {});
      gapi.client.setToken(null);
    }
    removeAccessToken();
  }

  useEffect(() => {
    const gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.onload = gapiLoaded;
    document.body.appendChild(gapiScript);

    const gisScript = document.createElement("script");
    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.onload = gisLoaded;
    document.body.appendChild(gisScript);
  }, []);

  return (
    <GoogleApiContext.Provider
      value={{ scriptsLoaded: isGapiLoaded && isGisLoaded, login, logout }}
    >
      {children}
    </GoogleApiContext.Provider>
  );
};

export default GoogleApiProvider;
