export type AccessToken = {
  token: string;
  expiresAt: Date;
};

export function saveAccessToken(accessToken: AccessToken) {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
}

export function getAccessToken(): AccessToken | null {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const parsedToken = JSON.parse(token);
  return {
    token: parsedToken.token,
    expiresAt: new Date(parsedToken.expiresAt),
  };
}

export function removeAccessToken() {
  localStorage.removeItem("accessToken");
}

export function isLoggedIn(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  return new Date(token.expiresAt) > new Date();
}
