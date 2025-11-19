import React from "react";
import { JwtContext } from "@/context";
import { CHECK_VALID_TOKEN } from "@/graphql-client";
import { useConfig } from "@/hooks";
import { loginAction, logoutAction } from "@/slices";
import { useAppDispatch, useAppSelector } from "@/stores";
import { useMutation } from "@apollo/client";
import { UserProps } from "@/types";
const JwtProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  const { onChangeLocale } = useConfig();
  const [checkValidTokenUser] = useMutation(CHECK_VALID_TOKEN);
  React.useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        checkValidTokenUser({ variables: { token: accessToken } })
          .then(async (response: any) => {
            if (response && response.data && response.data.checkValidToken) {
              const item = response.data.checkValidToken;
              const user: UserProps | null = item;
              if (user && user.locale) {
                onChangeLocale(user.locale);
                dispatch(loginAction(user));
              }
            } else {
              localStorage.removeItem("access_token");
              dispatch(logoutAction());
            }
          })
          .catch(async (err: any) => {
            localStorage.removeItem("access_token");
            dispatch(logoutAction());
          });
      } else {
        localStorage.removeItem("access_token");
        dispatch(logoutAction());
      }
    };
    init();
  }, []);
  return <JwtContext.Provider value={{ isLoggedIn, user }}>{children}</JwtContext.Provider>;
};
export { JwtProvider };
