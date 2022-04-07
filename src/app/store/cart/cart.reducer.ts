import { AppAction } from "@core/types/redux.type";
import { CartActionType, CartEpicType, CartState } from "./cart.type";

export default function cartReducer(
  state = initialState,
  action: AppAction
): CartState {
  switch (action.type) {
    case CartEpicType.FETCH_CART:
      return {
        ...state,
        isCartLoading: true,
        isCartError: false,
      };
    case CartActionType.STORE_CART:
      return {
        ...state,
        numberOfProducts: action.payload?.numberOfProducts,
      };
    case CartActionType.FETCH_CART_FAILED:
      return {
        ...state,
        isCartLoading: false,
        isCartError: true,
      };
    case CartActionType.CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

const initialState: CartState = {
  numberOfProducts: 0,
  isCartLoading: true,
  isCartError: false,
};
