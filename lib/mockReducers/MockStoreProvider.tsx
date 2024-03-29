"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Provider } from "react-redux";
import { planetReducer } from "../reducers/planetReducer";
import { AppStore } from "../store";

export default function MockStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const makeStore = () => {
    return configureStore({
      reducer: {
        planetReducer: planetReducer.reducer,
      },
    });
  };

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
