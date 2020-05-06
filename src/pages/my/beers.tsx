import Head from "next/head";
import React from "react";

import BeerCard from "../../components/BeerCard";
import BeerCardPlaceholder from "../../components/BeerCardPlaceholder";
import useFetch from "../../hooks/useFetch";
import { Beer } from "../../models/beer";
import { READ_MY_BEERS_RESOURCE } from "../../utils/endpoints";

const MyBeers = () => {
  const { data: beers, isLoading } = useFetch<Beer[]>(READ_MY_BEERS_RESOURCE, {
    getOnInit: true,
  });

  return (
    <>
      <Head>
        <title>My Beers | Tinnies</title>
      </Head>

      {!beers && isLoading ? (
        <>
          <BeerCardPlaceholder />
          <BeerCardPlaceholder />
        </>
      ) : (
        beers.map((beer) => <BeerCard beer={beer} key={beer._id} />)
      )}
    </>
  );
};

export default MyBeers;
