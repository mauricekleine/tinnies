import Head from "next/head";
import React from "react";

import BeerCard from "../../components/BeerCard";
import { useAuthentication, useMyBeers } from "../../utils/hooks";

const Home = () => {
  useAuthentication();

  const { beers } = useMyBeers();

  return (
    <>
      <Head>
        <title>My Beers | Tinnies</title>
      </Head>

      {beers.map((beer) => (
        <BeerCard beer={beer} key={beer._id} />
      ))}
    </>
  );
};

export default Home;
