import Head from "next/head";
import React from "react";
import useSWR from "swr";

import BeerCard from "../../components/BeerCard";
import useAuthentication from "../../hooks/useAuthentication";
import { BeerDocument } from "../../models/beer";
import { READ_MY_BEERS_RESOURCE } from "../../utils/endpoints";

const MyBeers = () => {
  useAuthentication();

  const { data: beers } = useSWR<BeerDocument[]>(READ_MY_BEERS_RESOURCE);

  return (
    <>
      <Head>
        <title>My Beers | Tinnies</title>
      </Head>

      {beers && beers.map((beer) => <BeerCard beer={beer} key={beer._id} />)}
    </>
  );
};

export default MyBeers;
