import axios from "axios";

import { BASE_API } from "../config";

import { auth } from "../utils/auth";

export function fetchAllCategories() {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/categories`, {
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

export function fetchCategoriesLikeName(nameSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = auth.getToken();
      const fetchUsersLikeUsername = await axios.get(
        `${BASE_API}/categories?search=${nameSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resolve(fetchUsersLikeUsername.data);
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

export function fetchProductsBySlugOfCategory(slug, page) {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/categories/${slug}/products?page=${page - 1}`, {
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

export function createNewCategory(newCategory) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(newCategory),
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

export function updateCategory(categoryId, categoryBody) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/categories/${categoryId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(categoryBody),
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

export function deleteCategory(categoryId) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/categories/${categoryId}`, {
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
