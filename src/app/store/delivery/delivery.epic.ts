import { combineEpics, ofType } from "redux-observable";
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from "rxjs";

import { Delivery } from "@app/models/delivery.model";
import DeliveryService from "@app/services/http/delivery.service";

import { AppAction } from "@core/types/redux.type";

import { storeDelivery } from "./delivery.action";
import { DeliveryActionType, DeliveryEpicType } from "./delivery.type";

export const fetchDelivery = (extras: {
  destroy$: Subject<void>;
}): AppAction => {
  return {
    type: DeliveryEpicType.FETCH_DELIVERY,
    payload: { extras },
  };
};

const fetchAndStoreDeliveryEpic = (
  action$: Observable<AppAction>
): Observable<AppAction> => {
  return action$.pipe(
    ofType(DeliveryEpicType.FETCH_DELIVERY),
    switchMap((action: AppAction) =>
      DeliveryService.getAll().pipe(
        map((response: any) =>
          storeDelivery(response?.result?.data as Delivery[])
        ),
        catchError(() =>
          of({
            type: DeliveryActionType.FETCH_DELIVERY_FAILED,
          })
        ),
        takeUntil(action.payload?.extras.destroy$)
      )
    )
  );
};

const deliveryEpic = combineEpics(fetchAndStoreDeliveryEpic);
export default deliveryEpic;
