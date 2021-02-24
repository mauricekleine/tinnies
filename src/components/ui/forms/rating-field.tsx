import { useField } from "formik";

import Rating from "../rating";

import FormGroup from "./form-group";
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
