import { signin } from "../api/authAPI";

const TOKEN_KEY = "token";

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
}

function isAuthenticated() {
  return !!getToken();
}

async function login(usernameLogin, passwordLogin, rememberMe) {
  const { userId, username, token } = await signin(
    usernameLogin,
    passwordLogin
  );

  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  return { userId, username, token };
}

async function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export const auth = {
  isAuthenticated,
  getToken,
  login,
  logout,
};
