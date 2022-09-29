import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";
import { persistReducer, persistStore } from "redux-persist";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
  },
  reducer
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
