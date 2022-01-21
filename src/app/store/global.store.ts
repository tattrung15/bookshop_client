import { applyMiddleware, combineReducers, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import { deliveryEpic, deliveryReducer, DeliveryState } from "./delivery";
import { authReducer, AuthState } from "./auth";

const rootReducer = combineReducers<GlobalState>({
  delivery: deliveryReducer,
  auth: authReducer,
});

const rootEpic = combineEpics(deliveryEpic);

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);
epicMiddleware.run(rootEpic);

export interface GlobalState {
  delivery: DeliveryState;
  auth: AuthState;
}

export default store;
