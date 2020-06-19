import React from "react";
import * as yup from "yup";

import {
  LOGIN_FORM_EMAIL_FIELD,
  LOGIN_FORM_PASSWORD_FIELD,
  LOGIN_FORM_SUBMIT_BTN,
} from "../../cypress/selectors";
import Page from "../components/Page";
import Card from "../components/ui/Card";
import Button from "../components/ui/buttons";
import { Form, Formik, InputField } from "../components/ui/forms";
import { Lead } from "../components/ui/typography";
import { User } from "../models/user";
import { CURRENT_USER_RESOURCE, LOGIN_RESOURCE } from "../utils/resources";
import useFetch from "../utils/useFetch";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const LoginPage = () => {
  const { post } = useFetch<User>(LOGIN_RESOURCE, {
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
    <Page title="Log in">
      <Card>
        <Lead>Log in</Lead>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
        >
          {({ isSubmitting, submitForm }) => (
            <Form>
              <InputField
                data-cy={LOGIN_FORM_EMAIL_FIELD}
                label="Email"
                name="email"
                type="email"
              />

              <InputField
                data-cy={LOGIN_FORM_PASSWORD_FIELD}
                label="Password"
                name="password"
                type="password"
              />

              <Button
                data-cy={LOGIN_FORM_SUBMIT_BTN}
                disabled={isSubmitting}
                isLoading={isSubmitting}
                onClick={submitForm}
                type="submit"
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Page>
  );
};

export default LoginPage;
