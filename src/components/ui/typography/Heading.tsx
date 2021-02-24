import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <p className="font-bold leading-none text-lg">{children}</p>
);

export default Heading;
