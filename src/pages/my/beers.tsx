import Head from "next/head";
import React from "react";

import BeerCard from "../../components/BeerCard";
import {  useMyBeers } from "../../hooks/hooks";
import useAuthentication from "../../hooks/useAuthentication";

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
