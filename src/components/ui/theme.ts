import { createContext } from "react";

const base = "indigo";

export const theme = {
  animations: {
    default: "duration-300 ease-in-out transition",
    fast: "duration-100 ease-in-out transition",
  },
  colors: {
    gray: "gray-700",
    grayDark: "gray-800",
    grayLight: "gray-400",
    grayLighter: "gray-200",
    primary: `${base}-500`,
    primaryAccent: `${base}-800`,
    red: "red-500",
    white: "white",
    yellow: "yellow-500",
  },
};

const ThemeContext = createContext(theme);
const Theme = ThemeContext.Consumer;

export const ThemeProvider = ThemeContext.Provider;

export default Theme;
