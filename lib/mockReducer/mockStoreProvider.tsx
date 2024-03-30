"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PlanetReducerType } from "@/app/models/reducerModels";
import { initialStateObject, planetReducer } from "../reducers/planetReducer";

/**
 * This function is used to setup Redux toolkit store to be used by the unit tests of this project. It takes in "children" and the initialState params. This is different than StoreProvider because this method allows the test class to supply it's own initialState object for it's tests which is the initialState of the redux store. This is used to perform unit testing of functions which depend on redux store values like favoritesList or sortOption.
 * @param children The ReactNode components which is to be rendered in the unit tests and which has access to the redux store.
 * @param initialState The initialState to be applied as the initialState of the redux store to be used for unit testing.
 * @returns the rendering of the components required for unit tests and the components having access to the redux store with the supplied initialState object.
 */
export default function MockStoreProvider({
  children,
  initialState = initialStateObject,
}: {
  children: React.ReactNode;
  initialState?: PlanetReducerType;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore(initialState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

const makeStore = (initialState: PlanetReducerType) => {
  return configureStore({
    reducer: {
      planetReducer: planetReducer(initialState).reducer,
    },
  });
};

type AppStore = ReturnType<typeof makeStore>;
