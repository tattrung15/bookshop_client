import { AppAction } from "@core/types/redux.type";
import { CartActionType, CartState } from "./cart.type";

export default function cartReducer(
  state = initialState,
  action: AppAction
): CartState {
  switch (action.type) {
    case CartActionType.STORE_CART:
      return {
        ...state,
        numberOfProducts: action.payload?.numberOfProducts,
      };
    case CartActionType.CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

const initialState: CartState = {
  numberOfProducts: 0,
};
