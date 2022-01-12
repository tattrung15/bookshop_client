import { Delivery } from "@app/models/delivery.model";

export interface DeliveryState {
  deliveries: Delivery[];
  isDeliveryLoading: boolean;
  isDeliveryError: boolean;
}

export enum DeliveryActionType {
  STORE_DELIVERY = "delivery/storyDelivery",
  FETCH_DELIVERY_FAILED = "delivery/fetchDeliveryFailed",
}

export enum DeliveryEpicType {
  FETCH_DELIVERY = "delivery/fetchDelivery",
}
