import React from "react";

import BeerCard from "../../components/BeerCard";
import BeerCardPlaceholder from "../../components/BeerCardPlaceholder";
import Page from "../../components/Page";
import useFetch from "../../hooks/useFetch";
import { Beer } from "../../models/beer";
import { MY_BEERS_RESOURCE } from "../../utils/resources";

const MyBeers = () => {
  const { data: beers, isLoading } = useFetch<Beer[]>(MY_BEERS_RESOURCE, {
    getOnInit: true,
  });

  return (
    <Page title="My Beers">
      {!beers && isLoading ? (
        <>
          <BeerCardPlaceholder />
          <BeerCardPlaceholder />
        </>
      ) : (
        beers.map((beer) => <BeerCard beer={beer} key={beer._id} />)
      )}
    </Page>
  );
};

export default MyBeers;
