import React from "react";

import colors from "./colors";

type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => (
  <section
    className={`bg-${colors.white} border border-b-4 border-r-2 border-${colors.grayLight} mb-8 px-6 py-6 rounded`}
  >
    {children}
  </section>
);

export default Card;
