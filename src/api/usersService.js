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

export function fetchUsersLikeUsername(usernameSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = auth.getToken();
      const fetchUserLogin = await axios.get(
        `${BASE_API}/users?search=${usernameSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resolve(fetchUserLogin.data);
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

export function fetchUserById(userId) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            return resolve(res.json());
          }
          return reject(res);
        })
        .catch((err) => {
          return reject(new Error(err.message));
        });
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

export function createNewUser(newUser) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(newUser),
      })
        .then((res) => {
          if (res.status === 201) {
            return resolve(res.json());
          }
          if (res.status === 400) {
            res.json().then((data) => {
              return reject(data);
            });
          }
        })
        .catch((err) => {
          return reject(new Error(err.message));
        });
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

export function updateUser(userId, userBody) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(userBody),
      })
        .then((res) => {
          if (res.status === 200) {
            return resolve(res.json());
          } else {
            res.json().then((data) => {
              return reject(data);
            });
          }
        })
        .catch((err) => {
          return reject(new Error(err.message));
        });
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

export function updateProfileUser(userId, userBody) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify(userBody),
      })
        .then((res) => {
          if (res.status === 200) {
            return resolve(res.json());
          } else {
            res.json().then((data) => {
              return reject(data);
            });
          }
        })
        .catch((err) => {
          return reject(new Error(err.message));
        });
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

export function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            return resolve(res.json());
          } else {
            res.json().then((data) => {
              return reject(data);
            });
          }
        })
        .catch((err) => {
          return reject(new Error(err.message));
        });
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}
