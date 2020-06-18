import React, { ReactNode } from "react";

const Lead = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-3xl">{children}</p>
);

export default Lead;
