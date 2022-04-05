import { AppAction } from "@core/types/redux.type";
import { CartActionType } from "./cart.type";

export const storeCart = (numberOfProducts: number): AppAction => {
  return {
    type: CartActionType.STORE_CART,
    payload: { numberOfProducts },
  };
};

export const clearCart = (): AppAction => {
  return {
    type: CartActionType.CLEAR_CART,
  };
};
