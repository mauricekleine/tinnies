import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import React from "react";
import * as Yup from "yup";

import { Button } from "./ui/Buttons";
import FormField from "./ui/FormField";

type Props = {
  label: string;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

const LoginSignupForm = ({ label, onSubmit }: Props) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={SignupSchema}
    >
      {({ isSubmitting, submitForm }) => (
        <Form>
          <FormField label="Email" name="email" type="email" />
          <FormField label="Password" name="password" type="password" />

          <Button disabled={isSubmitting} onClick={submitForm} type="submit">
            {label}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginSignupForm;
