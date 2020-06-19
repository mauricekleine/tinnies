import React from "react";

import BeerCard from "../components/BeerCard";
import BeerCardPlaceholder from "../components/BeerCardPlaceholder";
import Page from "../components/Page";
import { Beer } from "../models/beer";
import { BEERS_RESOURCE } from "../utils/resources";
import useFetch from "../utils/useFetch";

const Home = () => {
  const { data: beers, isLoading } = useFetch<Beer[]>(BEERS_RESOURCE, {
    getOnInit: true,
  });

  return (
    <Page title="Recent updates">
      {!beers && isLoading ? (
        <>
          <BeerCardPlaceholder />
          <BeerCardPlaceholder />
        </>
      ) : (
        beers && beers.map((beer) => <BeerCard beer={beer} key={beer._id} />)
      )}
    </Page>
  );
};

export default Home;
