import { BASE_API } from "../config";

import { auth } from "../utils/auth";

export function fetchProductImages() {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();
      fetch(`${BASE_API}/product-images`, {
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

export function fetchSearchProductImages(searchString) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();
      fetch(`${BASE_API}/product-images?search=${searchString}`, {
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

export function fetchProductImageBestSelling() {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();
      fetch(`${BASE_API}/product-images/best-selling`, {
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

export function fetchProductImagesByCategory(slugCategory) {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/product-images?category=${slugCategory}`, {
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
