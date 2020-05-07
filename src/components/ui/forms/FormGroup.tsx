import React, { ReactNode } from "react";

import FormError from "./FormError";
import FormLabel from "./FormLabel";

type FormGroup = {
  children: ReactNode;
  error?: string;
  hasError?: boolean;
  label: string;
  labelFor: string;
};

const FormGroup = ({
  children,
  error,
  hasError,
  label,
  labelFor,
}: FormGroup) => (
  <div className="mb-4">
    <div className="flex items-center justify-between">
      <FormLabel labelFor={labelFor}>{label}</FormLabel>
      {hasError && <FormError>{error}</FormError>}
    </div>

    {children}
  </div>
);

export default FormGroup;
