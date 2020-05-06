import { useField } from "formik";
import React from "react";

import { BeerRating } from "../../../models/beer";
import Rating from "../Rating";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type Props = {
  label: string;
  name: string;
};

const RatingField = ({ label, name }: Props) => {
  const [field, meta, helpers] = useField<BeerRating>({
    name,
    type: "number",
  });
  const hasFieldError = hasError<BeerRating>(meta);

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
