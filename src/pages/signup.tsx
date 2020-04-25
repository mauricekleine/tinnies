import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useUser } from "../libs/hooks";

const SignupPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, { mutate }] = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/timeline");
    }
  }, [router, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    const res = await fetch("/api/signup", {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (res.status === 201) {
      const userObj = await res.json();

      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
