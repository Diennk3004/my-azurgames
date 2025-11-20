"use client";
import { ConfigContext } from "@/context";
import React from "react";
type IConfig = {
  locale: string;
};
const ConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = React.useState<IConfig>({ locale: "en" });
  const onChangeLocale = async (locale: string) => {
    localStorage.setItem(process.env.NEXT_PUBLIC_APP_CONFIG ? process.env.NEXT_PUBLIC_APP_CONFIG.toString() : "", JSON.stringify({ ...config, locale }));
    setConfig({ ...config, locale });
  };
  React.useEffect(() => {
    const init = async () => {
      const projectConfigJson: string | null = localStorage.getItem(process.env.NEXT_PUBLIC_APP_CONFIG ? process.env.NEXT_PUBLIC_APP_CONFIG.toString() : "");
      if (projectConfigJson) {
        const projectConfigObj: IConfig = JSON.parse(projectConfigJson);
        if (projectConfigObj) {
          onChangeLocale(projectConfigObj.locale ? projectConfigObj.locale.toString() : "vi");
        }
      } else {
        onChangeLocale("vi");
      }
    };
    init();
  }, []);
  return <ConfigContext value={{ ...config, onChangeLocale }}>{children}</ConfigContext>;
};

export { ConfigProvider };
