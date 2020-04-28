import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

import BeerCard from "../components/BeerCard";
import { ButtonLink } from "../components/ui/Buttons";
import { useAuthentication, useBeers } from "../utils/hooks";

const Home = () => {
  useAuthentication();

  const { beers } = useBeers();

  return (
    <>
      <Head>
        <title>Recent updates | Tinnies</title>
      </Head>

      <div className="flex justify-end mb-4">
        <ButtonLink to="/new/beer">
          <div className="flex items-center">
            <FontAwesomeIcon className="h-4 mr-2 w-4" icon={faPlus} />
            Add a beer
          </div>
        </ButtonLink>
      </div>

      {beers.map((beer) => (
        <BeerCard beer={beer} key={beer._id} />
      ))}
    </>
  );
};

export default Home;
