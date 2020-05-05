import React, { ReactNode } from "react";

import FormError from "./FormError";
import FormLabel from "./FormLabel";

type FormGroup = {
  children: ReactNode;
  error?: string;
  hasError?: boolean;
  label: string;
};

const FormGroup = ({ children, error, hasError, label }: FormGroup) => (
  <div className="mb-4">
    <FormLabel>{label}</FormLabel>

    {children}

    {hasError && <FormError>{error}</FormError>}
  </div>
);

export default FormGroup;
