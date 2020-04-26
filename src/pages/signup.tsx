import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import LoginSignupForm from "../components/LoginSignupForm";
import User from "../models/user";
import { useUser } from "../utils/hooks";
import useFetch from "../utils/useFetch";

const SignupPage = () => {
  const { post } = useFetch<User>("/api/signup");
  const router = useRouter();
  const { mutate, user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/timeline");
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
        <title>Sign up</title>
      </Head>

      <div>
        <h2>Sign up</h2>

        <LoginSignupForm label="Sign up" onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default SignupPage;
