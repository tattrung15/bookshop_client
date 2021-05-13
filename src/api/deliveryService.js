import { BASE_API } from "../config";

export function fetchAllDeliveries() {
  return new Promise(async (resolve, reject) => {
    try {
      fetch(`${BASE_API}/deliveries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
