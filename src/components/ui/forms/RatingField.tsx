/** @jsx createElement */
import { useField } from "formik";
import { createElement } from "react";

import Rating from "../Rating";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type Props = {
  label: string;
  name: string;
};

const RatingField = ({ label, name }: Props) => {
  const [field, meta, helpers] = useField<number>({
    name,
    type: "number",
  });
  const hasFieldError = hasError<number>(meta);

  return (
    <FormGroup
      error={meta.error}
      hasError={hasFieldError}
      label={label}
      labelFor={name}
    >
      <Rating
        onClick={(rating) => helpers.setValue(rating)}
        size={2}
        value={field.value}
      />
    </FormGroup>
  );
};

export default RatingField;
