import React from "react";

import BeerCard from "../components/BeerCard";
import BeerCardPlaceholder from "../components/BeerCardPlaceholder";
import Page from "../components/Page";
import useFetch from "../hooks/useFetch";
import { Beer } from "../models/beer";
import { READ_BEERS_RESOURCE } from "../utils/resources";

const Home = () => {
  const { data: beers, isLoading } = useFetch<Beer[]>(READ_BEERS_RESOURCE, {
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
