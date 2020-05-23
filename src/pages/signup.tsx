import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

import {
  SIGNUP_FORM_EMAIL_FIELD,
  SIGNUP_FORM_NAME_FIELD,
  SIGNUP_FORM_PASSWORD_FIELD,
  SIGNUP_FORM_SUBMIT_BTN,
} from "../../cypress/selectors";
import Page from "../components/Page";
import { Button } from "../components/ui/Buttons";
import Card from "../components/ui/Card";
import { Title } from "../components/ui/Typography";
import InputField from "../components/ui/forms/InputField";
import useFetch from "../hooks/useFetch";
import { User } from "../models/user";
import { MY_PROFILE_RESOURCE, SIGNUP_RESOURCE } from "../utils/resources";

const SignupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  name: yup.string().min(2, "Too Short!").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const SignupPage = () => {
  const { post } = useFetch<User>(SIGNUP_RESOURCE, {
    cacheKey: MY_PROFILE_RESOURCE,
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      await post(values);
    } catch (e) {
      // $TODO: handle error
      setSubmitting(false);
    }
  };

  return (
    <Page title="Sign up">
      <Card>
        <Title>Sign up</Title>

        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}
        >
          {({ isSubmitting, submitForm }) => (
            <Form>
              <InputField
                data-cy={SIGNUP_FORM_NAME_FIELD}
                label="First name"
                name="name"
                type="text"
              />

              <InputField
                data-cy={SIGNUP_FORM_EMAIL_FIELD}
                label="Email"
                name="email"
                type="email"
              />

              <InputField
                data-cy={SIGNUP_FORM_PASSWORD_FIELD}
                label="Password"
                name="password"
                type="password"
              />

              <Button
                data-cy={SIGNUP_FORM_SUBMIT_BTN}
                disabled={isSubmitting}
                isLoading={isSubmitting}
                onClick={submitForm}
                type="submit"
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Page>
  );
};

export default SignupPage;
