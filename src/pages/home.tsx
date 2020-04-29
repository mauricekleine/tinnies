import Head from "next/head";
import React from "react";
import useSWR from "swr";

import BeerCard from "../components/BeerCard";
import useAuthentication from "../hooks/useAuthentication";
import { BeerDocument } from "../models/beer";
import { READ_BEERS_RESOURCE } from "../utils/endpoints";

const Home = () => {
  useAuthentication();

  const { data: beers } = useSWR<BeerDocument[]>(READ_BEERS_RESOURCE);

  return (
    <>
      <Head>
        <title>Recent updates | Tinnies</title>
      </Head>

      {beers && beers.map((beer) => (
        <BeerCard beer={beer} key={beer._id} />
      ))}
    </>
  );
};

export default Home;
