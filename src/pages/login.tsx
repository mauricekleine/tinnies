import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import LoginSignupForm from "../components/LoginSignupForm";
import { useUser } from "../utils/hooks";
import useFetch from "../utils/useFetch";

const LoginPage = () => {
  const { post } = useFetch("/api/login");
  const router = useRouter();
  const [user, { mutate }] = useUser();

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

    if (status === 200) {
      mutate(json);
    } else {
      // $TODO: handle error
    }
  };

  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>

      <div>
        <h2>Log in</h2>

        <LoginSignupForm label="Log in" onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default LoginPage;
