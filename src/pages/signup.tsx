import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import LoginSignupForm from "../components/LoginSignupForm";
import { Title } from "../components/ui/Typography";
import { UserDocument } from "../models/user";
import { useUser } from "../utils/hooks";
import useFetch from "../utils/useFetch";

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

      <Title>Sign up</Title>

      <LoginSignupForm label="Sign up" onSubmit={onSubmit} />
    </>
  );
};

export default SignupPage;
