import { atom, selector } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    userId: null,
    username: null,
    token: null,
    isAdmin: null,
  },
});

export const userSeletor = selector({
  key: "userAuth",
  get: ({ get }) => {
    const user = get(userState);
    return user;
  },
  set: ({ get, set }, newValue) => {
    let user = {};
    user.userId = newValue.userId;
    user.username = newValue.username;
    user.token = newValue.token;
    if (newValue.role === "ADMIN") {
      user.isAdmin = true;
    } else {
      user.isAdmin = false;
    }
    set(userState, user);
  },
});
