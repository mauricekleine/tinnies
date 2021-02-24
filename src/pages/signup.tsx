import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
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
import { Form, FormError, Formik, InputField } from "../components/ui/forms";
import { Lead } from "../components/ui/typography";
import { CURRENT_USER_QUERY } from "../lib/use-authentication";
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

const initialValues: MutationSignupArgs = {
  email: "",
  name: "",
  password: "",
};

const SignupPage = () => {
  const client = useApolloClient();
  const [signup, { error, loading }] = useMutation<
    { signup: Mutation["signup"] },
    MutationSignupArgs
  >(SIGNUP_USER, {
    onCompleted: (data) => {
      if (data && data.signup) {
        localStorage.setItem("token", data.signup.token);

        client.writeQuery({
          data: { currentUser: data.signup.user },
          query: CURRENT_USER_QUERY,
        });
      }
    },
    onError: () => {
      // error message is being handled below
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: MutationSignupArgs) => {
    await signup({ variables: values });

    router.replace("/home");
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
          {({ submitForm }) => (
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

              <div className="flex flex-row items-center justify-between">
                <Button
                  dataCy={SIGNUP_FORM_SUBMIT_BTN}
                  disabled={loading}
                  isLoading={loading}
                  onClick={submitForm}
                  type="submit"
                >
                  Sign up
                </Button>

                {error && (
                  <FormError>{error.graphQLErrors[0].message}</FormError>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Page>
  );
};

export default SignupPage;
