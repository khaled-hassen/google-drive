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

/**
 * A provider for Google API related operations in a React application.
 *
 * This provider uses the `GoogleApiContext` to provide a `scriptsLoaded` state that indicates whether the Google API scripts have been loaded, and `login` and `logout` functions for initiating Google login and logout.
 *
 * @property clientId - The client ID for the Google API.
 * @property apiKey - The API key for the Google API.
 * @property discoveryDocs - The discovery documents for the Google API.
 * @property scopes - The scopes for the Google API.
 * @property children - The children components to be rendered within this provider.
 *
 * @example
 * import GoogleApiProvider from "./GoogleApiProvider";
 *
 * // In a React component
 * <GoogleApiProvider
 *   apiKey={API_KEY}
 *   clientId={CLIENT_ID}
 *   scopes={scopes}
 *   discoveryDocs={discoveryDocs}
 * >
 *   <App />
 * </GoogleApiProvider>
 */
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

  /**
   * A function that loads the Google API client library and initializes it with the provided API key and discovery documents.
   *
   * This function is called when the Google API script is loaded. It uses the `gapi.load` function to load the Google API client library. Once the library is loaded, it initializes the client with the provided API key and discovery documents using the `gapi.client.init` function. It then sets the `isGapiLoaded` state to `true` to indicate that the Google API client library has been loaded and initialized.
   *
   * If the user is logged in, this function gets the access token of the user using the `getAccessToken` function and sets it as the token of the Google API client.
   *
   * @example
   * gapiLoaded(); // Loads the Google API client library and initializes it
   */
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
   * A function that initializes the Google Identity Services (GIS) token client.
   *
   * This function is called when the GIS script is loaded. It initializes the `tokenClient` reference with a new GIS token client using the `google.accounts.oauth2.initTokenClient` function. The token client is initialized with the provided client ID and scopes. An empty callback function is provided, which can be replaced with a custom callback function later.
   *
   * Once the token client is initialized, it sets the `isGisLoaded` state to `true` to indicate that the GIS token client has been initialized.
   *
   * @example
   * gisLoaded(); // Initializes the GIS token client
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
   * A function that initiates Google login.
   *
   * This function checks if the `tokenClient` reference is defined. If it is, it sets the callback of the `tokenClient` to a function that gets the access token of the user, calculates the expiration date of the token, and calls the `handleLogin` function with the token and the expiration date. It then calls the `onSuccess` function with the token response data.
   *
   * After setting the callback, this function checks if the Google API client has a token. If it does not, it requests an access token from the `tokenClient` with the `prompt` option set to `"consent"`, which prompts the user to select a Google Account and ask for consent to share their data when establishing a new session. If the Google API client has a token, it requests an access token from the `tokenClient` with the `prompt` option set to `""`, which skips the display of account chooser and consent dialog for an existing session.
   *
   * @param onSuccess - A callback function that is called when the login is successful. It takes a token response data as a parameter.
   *
   * @example
   * login((data) => console.log(data)); // Initiates Google login and logs the token response data when the login is successful
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
   * A function that initiates Google logout.
   *
   * This function gets the token of the Google API client using the `gapi.client.getToken` function. If the token is not `null`, it revokes the token using the `google.accounts.oauth2.revoke` function and sets the token of the Google API client to `null` using the `gapi.client.setToken` function. It then removes the access token using the `removeAccessToken` function.
   *
   * @example
   * logout(); // Initiates Google logout
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
