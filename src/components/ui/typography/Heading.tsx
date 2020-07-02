/** @jsx createElement */
import { ReactNode, createElement } from "react";

const Heading = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <p className="font-semibold text-xl">{children}</p>
);

export default Heading;
