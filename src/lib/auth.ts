type AccessToken = {
  token: string;
  expiresAt: Date;
};

export function saveAccessToken(accessToken: AccessToken) {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
}
