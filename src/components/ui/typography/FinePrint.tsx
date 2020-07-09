/** @jsx createElement */
import { ReactNode, createElement } from "react";

const FinePrint = ({ children }: { children: ReactNode }) => (
  <span className="font-normal text-sm">{children}</span>
);

export default FinePrint;
