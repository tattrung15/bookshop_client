export interface CartState {
  numberOfProducts: number;
}

export enum CartActionType {
  STORE_CART = "cart/storeCart",
  CLEAR_CART = "cart/clearCart",
}
