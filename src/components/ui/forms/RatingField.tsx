import { useField } from "formik";
import React from "react";

import { BeerDocument } from "../../../models/beer";
import Rating from "../Rating";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type Props = {
  label: string;
  name: string;
};

const RatingField = ({ label, name }: Props) => {
  const [field, meta, helpers] = useField<BeerDocument["rating"]>({
    name,
    type: "number",
  });
  const hasFieldError = hasError<BeerDocument["rating"]>(meta);

  return (
    <FormGroup error={meta.error} hasError={hasFieldError} label={label}>
      <Rating
        onClick={(rating) => helpers.setValue(rating)}
        size={2}
        value={field.value}
      />
    </FormGroup>
  );
};

export default RatingField;
