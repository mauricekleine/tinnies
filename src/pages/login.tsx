import { Form, Formik } from "formik";
import Head from "next/head";
import React from "react";
import * as yup from "yup";

import {
  LOGIN_FORM_EMAIL_FIELD,
  LOGIN_FORM_PASSWORD_FIELD,
  LOGIN_FORM_SUBMIT_BTN,
} from "../../cypress/selectors";
import { Button } from "../components/ui/Buttons";
import Card from "../components/ui/Card";
import { Title } from "../components/ui/Typography";
import InputField from "../components/ui/forms/InputField";
import useFetch from "../hooks/useFetch";
import { User } from "../models/user";
import { LOGIN_RESOURCE, READ_MY_PROFILE_RESOURCE } from "../utils/resources";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const LoginPage = () => {
  const { post } = useFetch<User>(LOGIN_RESOURCE, {
    cacheKey: READ_MY_PROFILE_RESOURCE,
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      await post({
        body: values,
      });
    } catch (e) {
      // $TODO: handle error
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Log in | Tinnies</title>
      </Head>

      <Card>
        <Title>Log in</Title>

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
    </>
  );
};

export default LoginPage;
