/** @jsx createElement */
import { ReactNode, createElement } from "react";

import { FinePrint } from "../typography";

import FormError from "./FormError";
import FormLabel from "./FormLabel";

type FormGroup = {
  children: ReactNode | ReactNode[];
  error?: string;
  hasError?: boolean;
  hintText?: string;
  label: string;
  labelFor: string;
};

const FormGroup = ({
  children,
  error,
  hasError,
  hintText,
  label,
  labelFor,
}: FormGroup) => (
  <div className="mb-4">
    <div className="flex items-center justify-between">
      <FormLabel labelFor={labelFor}>
        {label} {hintText && <FinePrint>{hintText}</FinePrint>}
      </FormLabel>

      {hasError && <FormError>{error}</FormError>}
    </div>

    {children}
  </div>
);

export default FormGroup;
