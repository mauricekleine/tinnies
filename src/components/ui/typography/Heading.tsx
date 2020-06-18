import React, { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => (
  <p className="font-semibold text-xl">{children}</p>
);

export default Heading;
