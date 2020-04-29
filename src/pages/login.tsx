import { Form, Formik } from "formik";
import Head from "next/head";
import React from "react";
import * as yup from "yup";

import { Button } from "../components/ui/Buttons";
import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import { Title } from "../components/ui/Typography";
import useAuthentication from "../hooks/useAuthentication";
import useFetch from "../hooks/useFetch";
import useUser from "../hooks/useUser";
import { UserDocument } from "../models/user";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const LoginPage = () => {
  useAuthentication({ isPublic: true });

  const { post } = useFetch<UserDocument>("/api/login");
  const { mutate } = useUser();

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { json, status } = await post({
      body: JSON.stringify(values),
    });

    setSubmitting(false);

    if (status === 200) {
      mutate(json);
    } else {
      // $TODO: handle error
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
              <FormField label="Email" name="email" type="email" />
              <FormField label="Password" name="password" type="password" />

              <Button
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
