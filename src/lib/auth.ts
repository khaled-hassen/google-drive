export type AccessToken = {
  token: string;
  expiresAt: Date;
};

/**
 * A utility function that saves an access token to local storage.
 *
 * @param accessToken - The access token to be saved. It is an object that contains a token string and an expiration date.
 *
 * @example
 * saveAccessToken({ token: "abc123", expiresAt: new Date("2022-12-31T23:59:59Z") }); // Saves the access token to local storage
 */
export function saveAccessToken(accessToken: AccessToken) {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
}

/**
 * A utility function that retrieves an access token from local storage.
 *
 * @returns An object representing the access token, which contains a token string and an expiration date. If no access token is found, returns null.
 *
 * @example
 * getAccessToken(); // Returns { token: "abc123", expiresAt: new Date("2022-12-31T23:59:59Z") } or null
 */
export function getAccessToken(): AccessToken | null {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const parsedToken = JSON.parse(token);
  return {
    token: parsedToken.token,
    expiresAt: new Date(parsedToken.expiresAt),
  };
}

/**
 * A utility function that removes an access token from local storage.
 *
 * @example
 * removeAccessToken(); // Removes the access token from local storage
 */
export function removeAccessToken() {
  localStorage.removeItem("accessToken");
}

/**
 * A utility function that checks if the user is logged in.
 *
 * @returns A boolean value indicating whether the user is logged in. Returns true if the user is logged in (i.e., if there is a valid access token in local storage that has not yet expired), and false otherwise.
 *
 * @example
 * isLoggedIn(); // Returns true or false
 */
export function isLoggedIn(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  return new Date(token.expiresAt) > new Date();
}
