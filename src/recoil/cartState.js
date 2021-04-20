import { atom, selector } from "recoil";

export const cartState = atom({
  key: "cart",
  default: {
    numberOfProducts: 0,
  },
});

export const cartSeletor = selector({
  key: "numberOfProducts",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart;
  },
  set: ({ get, set }, newValue) => {
    let cart = {};
    cart.numberOfProducts = newValue.numberOfProducts;
    set(cartState, cart);
  },
});
