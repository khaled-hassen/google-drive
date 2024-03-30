import React, { useEffect, useRef } from "react";
import GoogleApiContext from "../../context/GoogleApiContext.ts";

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
  const tokenClient = useRef<any>();

  function gapiLoaded() {
    gapi.load(
      "client",
      async () => await gapi.client.init({ apiKey, discoveryDocs }),
    );
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
  }

  /**
   *  Sign in the user upon button click.
   */
  function login(onSuccess: (data: any) => void) {
    tokenClient.current.callback = onSuccess;

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.current.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.current.requestAccessToken({ prompt: "" });
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
    <GoogleApiContext.Provider value={{ login, logout }}>
      {children}
    </GoogleApiContext.Provider>
  );
};

export default GoogleApiProvider;
