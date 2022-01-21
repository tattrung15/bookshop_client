import { Role } from "@app/shared/types/user.type";
import { AppAction } from "@core/types/redux.type";
import { AuthActionType, AuthState } from "./auth.type";

export default function authReducer(
  state = initialState,
  action: AppAction
): AuthState {
  switch (action.type) {
    case AuthActionType.STORE_AUTH:
      return {
        ...state,
        id: action.payload?.user?.id,
        username: action.payload?.user?.username,
        role: action.payload?.user?.role,
      };
    case AuthActionType.CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
}

const initialState: AuthState = {
  id: 0,
  username: "",
  role: Role.GUEST,
};
