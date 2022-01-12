import { AppAction } from "@core/types/redux.type";
import {
  DeliveryActionType,
  DeliveryEpicType,
  DeliveryState,
} from "./delivery.type";

export default function deliveryReducer(
  state = initialState,
  action: AppAction
): DeliveryState {
  switch (action.type) {
    case DeliveryEpicType.FETCH_DELIVERY:
      return {
        ...state,
        isDeliveryLoading: true,
        isDeliveryError: false,
      };
    case DeliveryActionType.STORE_DELIVERY:
      return {
        ...state,
        deliveries: action.payload?.deliveries,
        isDeliveryLoading: false,
      };
    case DeliveryActionType.FETCH_DELIVERY_FAILED:
      return {
        ...state,
        isDeliveryLoading: false,
        isDeliveryError: true,
      };
    default:
      return state;
  }
}

const initialState: DeliveryState = {
  deliveries: [],
  isDeliveryLoading: true,
  isDeliveryError: false,
};
