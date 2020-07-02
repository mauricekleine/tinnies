/** @jsx createElement */
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { ApolloClient, gql } from "apollo-boost";
import { FormikHelpers } from "formik";
import { createElement } from "react";
import * as yup from "yup";

import {
  SIGNUP_FORM_EMAIL_FIELD,
  SIGNUP_FORM_NAME_FIELD,
  SIGNUP_FORM_PASSWORD_FIELD,
  SIGNUP_FORM_SUBMIT_BTN,
} from "../../cypress/selectors";
import Page from "../components/Page";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Form, Formik, InputField } from "../components/ui/forms";
import { Lead } from "../components/ui/typography";
import { Mutation, MutationSignupArgs } from "../types/graphql";

export const SIGNUP_USER = gql`
  mutation signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      token
    }
  }
`;

const SignupSchema = yup.object<MutationSignupArgs>().shape({
  email: yup.string().email("Invalid email").required("Required"),
  name: yup.string().min(2, "Too Short!").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const SignupPage = () => {
  const client: ApolloClient<any> = useApolloClient();

  const [signup] = useMutation<
    { signup: Mutation["signup"] },
    MutationSignupArgs
  >(SIGNUP_USER, {
    onCompleted: (data) => {
      if (data && data.signup) {
        localStorage.setItem("token", data.signup.token);
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
  });

  const initialValues: MutationSignupArgs = {
    email: "",
    name: "",
    password: "",
  };

  const handleSubmit = (
    values: MutationSignupArgs,
    { setSubmitting }: FormikHelpers<MutationSignupArgs>
  ) => {
    setSubmitting(true);

    try {
      signup({ variables: values });
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
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignupSchema}
        >
          {({ isSubmitting, submitForm }) => (
            <Form>
              <InputField
                dataCy={SIGNUP_FORM_NAME_FIELD}
                label="First name"
                name="name"
                type="text"
              />

              <InputField
                dataCy={SIGNUP_FORM_EMAIL_FIELD}
                label="Email"
                name="email"
                type="email"
              />

              <InputField
                dataCy={SIGNUP_FORM_PASSWORD_FIELD}
                label="Password"
                name="password"
                type="password"
              />

              <Button
                dataCy={SIGNUP_FORM_SUBMIT_BTN}
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
