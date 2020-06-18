import React from "react";

import Theme from "./theme";

type Props = {
  children: React.ReactNode;
  px?: string;
};

const Card = ({ children, px = "6" }: Props) => (
  <Theme>
    {({ colors }) => (
      <section
        className={`bg-${colors.white} border border-b-4 border-${colors.grayLight} mb-8 px-${px} py-6 rounded-lg`}
      >
        {children}
      </section>
    )}
  </Theme>
);

export default Card;
