import { BASE_API } from "../config";

import { auth } from "../utils/auth";

export function fetchProductBySlug(slug) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();
      fetch(`${BASE_API}/products/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.json());
          } else {
            reject(res);
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
