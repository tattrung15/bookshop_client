import { BASE_API } from "../config";

import { auth } from "../utils/auth";

export function fetchUpdateQuantity(orderItemId, quantity) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = auth.getToken();
      fetch(`${BASE_API}/orders/${orderItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
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

export function fetchDeleteOrderItem(orderItemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = auth.getToken();
      fetch(`${BASE_API}/orders/${orderItemId}`, {
        method: "DELETE",
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
