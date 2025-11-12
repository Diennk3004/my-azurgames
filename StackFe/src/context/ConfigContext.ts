import { createContext } from "react";
import { IConfigContext } from "@/types";
const ConfigContext = createContext<IConfigContext>({
  locale: "en",
  onChangeLocale: () => {}
});
export { ConfigContext };
