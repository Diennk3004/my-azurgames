"use client";
import React from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
type IProps = {
  children: React.ReactNode;
};
const StoreProvider: React.FC<React.PropsWithChildren<IProps>> = ({ children }) => {
  const storeRef = React.useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};
export { StoreProvider };
