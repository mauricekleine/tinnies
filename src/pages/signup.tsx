import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as yup from "yup";

import { Button } from "../components/ui/Buttons";
import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import { Title } from "../components/ui/Typography";
import { UserDocument } from "../models/user";
import { useUser } from "../utils/hooks";
import useFetch from "../utils/useFetch";

const SignupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  name: yup.string().min(2, "Too Short!").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const SignupPage = () => {
  const { post } = useFetch<UserDocument>("/api/signup");
  const router = useRouter();
  const { mutate, user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [router, user]);

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { json, status } = await post({
      body: JSON.stringify(values),
    });

    setSubmitting(false);

    if (status === 201) {
      mutate(json);
    } else {
      // $TODO: handle error
    }
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
