import { ReactNode } from "react";

type FormLabelProps = {
  children: ReactNode | ReactNode[];
  labelFor: string;
};

const FormLabel = ({ children, labelFor }: FormLabelProps) => (
  <label className="block font-semibold mb-1" htmlFor={labelFor}>
    {children}
  </label>
);

export default FormLabel;
