export interface AuthState {
  id: number;
  username: string;
  role: string;
}

export enum AuthActionType {
  STORE_AUTH = "auth/storeAuth",
  CLEAR_AUTH = "auth/clearAuth",
}

export enum AuthEpicType {
  FETCH_AUTH = "auth/fetchAuth",
}
