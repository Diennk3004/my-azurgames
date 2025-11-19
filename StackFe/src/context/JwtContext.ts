"use client";
import { UserProps } from "@/types";
import React from "react";
type JwtContextType = {
  isLoggedIn: boolean;
  user: UserProps | null;
};
const JwtContext = React.createContext<JwtContextType>({
  isLoggedIn: true,
  user: null
});
export { JwtContext };
