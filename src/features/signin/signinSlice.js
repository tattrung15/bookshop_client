import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: null,
  userId: null,
  username: null,
  role: null,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.loggedIn = true;
      state.token = payload.token;
      state.userId = payload.userId;
      state.username = payload.username;
      state.role = payload.role;
      return state;
    },
    logout: (state) => {
      state.loggedIn = true;
      state.token = null;
      state.userId = null;
      state.username = null;
      state.role = null;
      return state;
    },
    user: (state) => state,
  },
});

export const { login, logout, user } = signinSlice.actions;
export const signinReducer = signinSlice.reducer;
