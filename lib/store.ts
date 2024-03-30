import { configureStore } from "@reduxjs/toolkit";
import { planetReducer } from "./reducers/planetReducer";

//This function configures planetReducer to be added as a reducer object for the redux store.
export const makeStore = () => {
  return configureStore({
    reducer: {
      planetReducer: planetReducer().reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
