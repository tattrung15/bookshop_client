import axios from "axios";

import { BASE_API } from "../config";

import { auth } from "../utils/auth";

export function fetchProductImages() {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/product-images`, {
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

export function fetchAllProductsHaveImage() {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/product-images?type=have-image`, {
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

export function fetchAllProductsNoImage() {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/product-images?type=no-image`, {
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

export function fetchSearchProductImages(searchString) {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/product-images?search=${searchString}`, {
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

export function fetchProductHaveImageLikeTitle(titleSearch) {
  return new Promise(async (resolve, reject) => {
    try {
      const fetchProductHaveImageLikeTitle = await axios.get(
        `${BASE_API}/product-images?type=have-image&search=${titleSearch}`
      );
      return resolve(fetchProductHaveImageLikeTitle.data);
    } catch (err) {
      return reject(new Error(err.message));
    }
  });
}

export function fetchProductImageBestSelling() {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${BASE_API}/product-images/best-selling`, {
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

export function createNewProductImages(newProductImage) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      let formData = new FormData();
      formData.append("productId", newProductImage.productId);
      for (let i = 0; i < newProductImage.productImages.length; i++) {
        formData.append("files", newProductImage.productImages[i]);
      }

      fetch(`${BASE_API}/product-images`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
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

export function updateProductImages(productId, productImagesBody) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      let formData = new FormData();
      for (let i = 0; i < productImagesBody.length; i++) {
        formData.append("files", productImagesBody[i]);
      }

      fetch(`${BASE_API}/product-images?productId=${productId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: formData,
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

export function deleteProductImages(productId) {
  return new Promise((resolve, reject) => {
    try {
      const token = auth.getToken();

      fetch(`${BASE_API}/product-images/product/${productId}`, {
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
