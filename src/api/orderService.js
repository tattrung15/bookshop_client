import { BASE_API } from "../config";

import { auth } from "../utils/auth";

// export function fetchOrderItemsByUserId(userId) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const token = auth.getToken();
//       fetch(`${BASE_API}/carts/users/${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => {
//           if (res.status === 200) {
//             resolve(res.json());
//           } else {
//             reject(res);
//           }
//         })
//         .catch((err) => {
//           return reject(new Error(err.message));
//         });
//     } catch (err) {
//       return reject(new Error(err.message));
//     }
//   });
// }
