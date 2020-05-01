import Head from "next/head";
import React from "react";

import NewBeerCard from "../../components/NewBeerCard";

const NewBeer = () => (
  <>
    <Head>
      <title>Add a new beer | Tinnies</title>
    </Head>

    <NewBeerCard />
  </>
);

export default NewBeer;
