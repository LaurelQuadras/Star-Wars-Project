"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";

/**
 * This function is used to setup Redux toolkit store to be used by this web application. It takes in a "children" param.
 * @param children The ReactNode components which is to be rendered in the UI and which has access to the redux store.
 * @returns the rendering of UI where the all the chidren components have access to the redux store.
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
