import Head from "next/head";
import React from "react";

import { Title } from "../components/ui/Typography";
import useAuthentication from "../hooks/useAuthentication";

const Home = () => {
  useAuthentication({ isPublic: true });

  return (
    <>
      <Head>
        <title>Tinnies | Beer tracking, but better</title>
      </Head>

      <Title>Tinnies | Beer tracking, but better</Title>
    </>
  );
};

export default Home;
