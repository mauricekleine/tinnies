import { ReactNode } from "react";

const Lead = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <p className="mb-4 text-2xl sm:text-3xl">{children}</p>
);

export default Lead;
