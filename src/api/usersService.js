import { BASE_API } from "../config";
import axios from "axios";

import { auth } from "../utils/auth";

export function fetchAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = auth.getToken();
      const fetchUserLogin = await axios.get(`${BASE_API}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resolve(fetchUserLogin.data);
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}
