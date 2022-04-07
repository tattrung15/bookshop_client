export interface CartState {
  numberOfProducts: number;
  isCartLoading: boolean;
  isCartError: boolean;
}

export enum CartActionType {
  STORE_CART = "cart/storeCart",
  CLEAR_CART = "cart/clearCart",
  FETCH_CART_FAILED = "cart/fetchCartFailed",
}

export enum CartEpicType {
  FETCH_CART = "cart/fetchCart",
}
