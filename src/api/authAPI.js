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
        const { userId, username, jwt } = fetchUserLogin.data;
        resoleve({
          userId: userId,
          username: username,
          token: jwt,
        });
      } else {
        return reject(new Error("Invalid username and password."));
      }
    } catch (error) {
      return reject(error);
    }

    return reject(new Error("Invalid username and password."));
  });
}
