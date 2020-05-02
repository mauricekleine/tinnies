import Head from "next/head";
import React from "react";

import BeerCard from "../../components/BeerCard";
import useFetch from "../../hooks/useFetch";
import { BeerDocument } from "../../models/beer";
import { READ_MY_BEERS_RESOURCE } from "../../utils/endpoints";

const MyBeers = () => {
  const { data: beers } = useFetch<BeerDocument[]>(READ_MY_BEERS_RESOURCE, {
    getOnInit: true,
  });

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
