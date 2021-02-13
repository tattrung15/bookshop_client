import { BASE_API } from "../config";
import axios from "axios";

export function signin(username, password) {
  return new Promise(async (resoleve, reject) => {
    try {
      const fetchUserLogin = await axios.post(`${BASE_API}/auth/login`, {
        username: username,
        password: password,
      });
      if (fetchUserLogin.status === 200) {
        const { userId, username, jwt, role } = fetchUserLogin.data;
        resoleve({
          userId: userId,
          username: username,
          token: jwt,
          role: role,
        });
      } else {
        return reject(new Error("Invalid username or password."));
      }
    } catch (error) {
      return reject(new Error("Invalid username or password."));
    }

    return reject(new Error("Invalid username or password."));
  });
}

export function validateToken(jwt) {
  return new Promise(async (resoleve, reject) => {
    try {
      const fetchUserLogin = await axios.post(`${BASE_API}/auth/validate`, {
        jwt: jwt,
      });
      if (fetchUserLogin.status === 200) {
        const { userId, username, jwt, role } = fetchUserLogin.data;
        resoleve({
          userId: userId,
          username: username,
          token: jwt,
          role: role,
        });
      } else {
        return reject(new Error("Invalid token."));
      }
    } catch (error) {
      return reject(new Error("Invalid token."));
    }

    return reject(new Error("Invalid token."));
  });
}
