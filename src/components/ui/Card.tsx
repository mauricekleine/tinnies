import React from "react";

import colors from "./colors";

type Props = {
  children: React.ReactNode;
  px?: string;
};

const Card = ({ children, px = "6" }: Props) => (
  <section
    className={`bg-${colors.white} border border-b-4 border-r-2 border-${colors.grayLight} mb-8 px-${px} py-6 rounded`}
  >
    {children}
  </section>
);

export default Card;
