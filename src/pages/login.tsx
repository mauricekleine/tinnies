import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as yup from "yup";

import {
  LOGIN_FORM_EMAIL_FIELD,
  LOGIN_FORM_PASSWORD_FIELD,
  LOGIN_FORM_SUBMIT_BTN,
} from "../../cypress/selectors";
import Page from "../components/Page";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Form, FormError, Formik, InputField } from "../components/ui/forms";
import { Lead } from "../components/ui/typography";
import { CURRENT_USER_QUERY } from "../lib/use-authentication";
import { Mutation, MutationLoginArgs } from "../types/graphql";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        name
      }
    }
  }
`;

const LoginSchema = yup.object<MutationLoginArgs>().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
});

const initialValues: MutationLoginArgs = { email: "", password: "" };

type MutationLoginData = {
  login: Mutation["login"];
};

const LoginPage = () => {
  const client = useApolloClient();
  const [login, { error, loading }] = useMutation<
    MutationLoginData,
    MutationLoginArgs
  >(LOGIN_USER, {
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data && data.login) {
        localStorage.setItem("token", data.login.token);

        client.writeQuery({
          data: { currentUser: data.login.user },
          query: CURRENT_USER_QUERY,
        });
      }
    },
    onError: () => {
      // error message is being handled below
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: MutationLoginArgs) => {
    await login({ variables: values });

    router.replace("/home");
  };

  return (
    <Page title="Log in">
      <Card>
        <Lead>Log in</Lead>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={LoginSchema}
        >
          {({ submitForm }) => (
            <Form>
              <InputField
                dataCy={LOGIN_FORM_EMAIL_FIELD}
                label="Email"
                name="email"
                type="email"
              />

              <InputField
                dataCy={LOGIN_FORM_PASSWORD_FIELD}
                label="Password"
                name="password"
                type="password"
              />

              <div className="flex flex-row items-center justify-between">
                <Button
                  dataCy={LOGIN_FORM_SUBMIT_BTN}
                  disabled={loading}
                  isLoading={loading}
                  onClick={submitForm}
                  type="submit"
                >
                  Log in
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

export default LoginPage;
