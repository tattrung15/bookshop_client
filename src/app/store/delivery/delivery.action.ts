import { Delivery } from "@app/models/delivery.model";
import { AppAction } from "@core/types/redux.type";
import { DeliveryActionType } from "./delivery.type";

export const storeDelivery = (deliveries: Delivery[]): AppAction => {
  return {
    type: DeliveryActionType.STORE_DELIVERY,
    payload: { deliveries },
  };
};
