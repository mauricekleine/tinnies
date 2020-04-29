import { useField } from "formik";
import React from "react";

import { BeerDocument } from "../models/beer";

import { FormError, FormLabel } from "./ui/FormField";
import Rating from "./ui/Rating";

type Props = {
  label: string;
  name: string;
};

const BeerRatingField = ({ label, name }: Props) => {
  const [field, meta, helpers] = useField<BeerDocument["rating"]>({
    name,
    type: "number",
  });

  return (
    <div className="mb-4">
      <FormLabel>{label}</FormLabel>

      <Rating
        onClick={(rating) => helpers.setValue(rating)}
        size={2}
        value={field.value}
      />

      {meta.touched && meta.error && <FormError>{meta.error}</FormError>}
    </div>
  );
};

export default BeerRatingField;
