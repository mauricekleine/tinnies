import React, { ReactNode } from "react";

export const Title = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-3xl">{children}</p>
);
