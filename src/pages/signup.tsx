import React from "react";
import * as yup from "yup";

import {
  SIGNUP_FORM_EMAIL_FIELD,
  SIGNUP_FORM_NAME_FIELD,
  SIGNUP_FORM_PASSWORD_FIELD,
  SIGNUP_FORM_SUBMIT_BTN,
} from "../../cypress/selectors";
import Page from "../components/Page";
import Card from "../components/ui/Card";
import Button from "../components/ui/buttons";
import { Form, Formik, InputField } from "../components/ui/forms";
import { Lead } from "../components/ui/typography";
import { User } from "../models/user";
import { CURRENT_USER_RESOURCE, SIGNUP_RESOURCE } from "../utils/resources";
import useFetch from "../utils/useFetch";

const SignupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  name: yup.string().min(2, "Too Short!").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const SignupPage = () => {
  const { post } = useFetch<User>(SIGNUP_RESOURCE, {
    cacheKey: CURRENT_USER_RESOURCE,
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
        <Lead>Sign up</Lead>

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
