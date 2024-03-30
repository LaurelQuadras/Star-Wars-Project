"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PlanetReducerType } from "@/app/models/reducerModels";
import { initialStateObject, planetReducer } from "../reducers/planetReducer";

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
