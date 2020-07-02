/** @jsx createElement */
import { ReactNode, createElement } from "react";

const Lead = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <p className="mb-4 text-3xl">{children}</p>
);

export default Lead;
