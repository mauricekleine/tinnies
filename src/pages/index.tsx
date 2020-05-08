import React from "react";

import Page from "../components/Page";

import UndrawHavingFunSVG from "./undraw_having_fun_iais.svg";

const Home = () => (
  <Page title="Beer tracking, but better">
    <div className="text-center">
      <h1 className="font-semibold leading-none text-6xl">Tinnies</h1>
      <h2 className="text-xl">beer tracking, but better</h2>

      <div className="mt-4">
        <UndrawHavingFunSVG />
      </div>
    </div>
  </Page>
);

export default Home;
