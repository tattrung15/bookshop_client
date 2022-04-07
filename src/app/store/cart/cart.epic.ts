import { combineEpics, ofType } from "redux-observable";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { AppAction } from "@core/types/redux.type";
import { CartActionType, CartEpicType } from "./cart.type";
import CartService from "@app/services/http/cart.service";
import { clearCart, storeCart } from "./cart.action";

export const fetchCart = (): AppAction => {
  return {
    type: CartEpicType.FETCH_CART,
  };
};

const fetchAndStoreCartEpic = (
  action$: Observable<AppAction>
): Observable<AppAction> => {
  return action$.pipe(
    ofType(CartEpicType.FETCH_CART),
    switchMap(() =>
      CartService.getCart().pipe(
        map((result: any) => {
          if (result?.data) {
            return storeCart(result.data?.orderItems?.length ?? 0);
          } else {
            return clearCart();
          }
        }),
        catchError(() =>
          of({
            type: CartActionType.FETCH_CART_FAILED,
          })
        )
      )
    )
  );
};

const cartEpic = combineEpics(fetchAndStoreCartEpic);
export default cartEpic;
