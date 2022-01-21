import { User } from "@app/models/user.model";
import { AppAction } from "@core/types/redux.type";
import { AuthActionType } from "./auth.type";

export const storeUser = (user: User): AppAction => {
  return {
    type: AuthActionType.STORE_AUTH,
    payload: { user },
  };
};

export const clearUser = (): AppAction => {
  return {
    type: AuthActionType.CLEAR_AUTH,
  };
};
