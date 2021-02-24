import classNames from "classnames";
import { ReactNode } from "react";

import useAuthentication from "../lib/use-authentication";

import Footer from "./footer";
import Navbar from "./ui/navbar";
import Theme, { ThemeProvider, theme } from "./ui/theme";

type Props = {
  children: ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  const { currentUser, isLoading, logout } = useAuthentication();

  return (
    <ThemeProvider value={theme}>
      <Theme>
        {({ bg, text }) => (
          <div
            className={classNames(
              bg.background,
              text.colors.default,
              "flex flex-col font-light min-h-screen text-sm sm:text-base"
            )}
          >
            <Navbar onLogout={logout} user={currentUser} />

            <div className="container flex-1 mx-auto mb-4 mt-8 px-4 sm:px-0">
              {!isLoading && children}
            </div>

            <Footer />
          </div>
        )}
      </Theme>
    </ThemeProvider>
  );
};

export default AppWrapper;
