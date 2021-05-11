import axios from "axios";

import { BASE_API } from "../config";

import { auth } from "../utils/auth";

export function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/products?type=without-image`, {
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

export function fetchProductsLikeTitle(titleSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      const fetchProductsLikeTitle = await axios.get(
        `${BASE_API}/products?search=${titleSearch}`
      );
      return resolve(fetchProductsLikeTitle.data);
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

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

export function createNewProduct(newProduct) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(newProduct),
      })
        .then((res) => {
          if (res.status === 201) {
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

export function updateProduct(productId, productBody) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/products/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(productBody),
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

export function deleteProduct(productId) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/products/${productId}`, {
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
