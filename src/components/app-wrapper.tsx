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
              "flex flex-col font-light min-h-screen"
            )}
          >
            <Navbar onLogout={logout} user={currentUser} />

            <div className="flex-1 mx-auto mb-4 mt-8 w-4/5 md:w-3/5 lg:w-2/5">
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
