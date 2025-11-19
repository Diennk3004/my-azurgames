"use client";
import React from "react";
import { IConfigContext } from "@/types";
const ConfigContext = React.createContext<IConfigContext>({
  locale: "en",
  onChangeLocale: () => {}
});
export { ConfigContext };
