import Head from "next/head";
import React from "react";

import NewBeerCard from "../../components/NewBeerCard";
import { useAuthentication } from "../../utils/hooks";

const Home = () => {
  useAuthentication();

  return (
    <>
      <Head>
        <title>Add a new beer | Tinnies</title>
      </Head>

      <NewBeerCard />
    </>
  );
};

export default Home;
