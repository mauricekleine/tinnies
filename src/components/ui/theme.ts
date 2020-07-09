import { createContext } from "react";

export const theme = {
  animations: {
    default: "duration-300 ease-in-out transition",
    fast: "duration-100 ease-in-out transition",
  },
  bg: {
    background: "bg-gray-200",
    default: "bg-gray-400",
    footer: "bg-gray-800",
    hover: {
      gray: "hover:bg-gray-200",
      white: "hover:bg-white",
    },
    modal: "bg-gray-800 bg-opacity-75",
    primary: "bg-indigo-500",
    white: "bg-white",
  },
  border: {
    colors: {
      default: "border-gray-400",
      focus: {
        primary: "focus:border-indigo-500",
      },
      hover: {
        primaryAccent: "hover:border-indigo-800",
      },
      primary: "border-indigo-500",
      primaryAccent: "border-indigo-800",
      red: "border-red-500",
    },
  },
  text: {
    colors: {
      default: "text-gray-800",
      disabled: "text-gray-400",
      hover: {
        primary: "hover:text-indigo-500",
        primaryAccent: "hover:text-indigo-800",
      },
      muted: "text-gray-700",
      primary: "text-indigo-500",
      primaryAccent: "text-indigo-800",
      red: "text-red-500",
      white: "text-white",
      yellow: "text-yellow-500",
    },
  },
};

const ThemeContext = createContext(theme);
const Theme = ThemeContext.Consumer;

export const ThemeProvider = ThemeContext.Provider;

export default Theme;
