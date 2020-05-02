import { Form, Formik } from "formik";
import Head from "next/head";
import React from "react";
import * as yup from "yup";

import { Button } from "../components/ui/Buttons";
import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import { Title } from "../components/ui/Typography";
import useFetch from "../hooks/useFetch";
import { UserDocument } from "../models/user";
import { LOGIN_RESOURCE, READ_MY_PROFILE_RESOURCE, SIGNUP_RESOURCE } from "../utils/endpoints";

const SignupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  name: yup.string().min(2, "Too Short!").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const SignupPage = () => {
  const { post } = useFetch<UserDocument>(SIGNUP_RESOURCE, {
    cacheKey: READ_MY_PROFILE_RESOURCE,
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    await post({
      body: values,
    });

    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Sign up | Tinnies</title>
      </Head>

      <Card>
        <Title>Sign up</Title>

        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}
        >
          {({ isSubmitting, submitForm }) => (
            <Form>
              <FormField label="Name" name="name" type="text" />
              <FormField label="Email" name="email" type="email" />
              <FormField label="Password" name="password" type="password" />

              <Button
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
    </>
  );
};

export default SignupPage;
