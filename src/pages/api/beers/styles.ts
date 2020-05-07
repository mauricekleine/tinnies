import { NextApiHandler } from "next";
import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import BeerStyleModel, { BeerStyleDocument } from "../../../models/beerStyle";

const handleGetRequest: NextApiHandler<BeerStyleDocument[]> = async (
  req,
  res
) => {
  const beerStyles = await BeerStyleModel.find().sort({ name: 1 });

  res.status(200).json(beerStyles);
};
export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest); // GET api/beers/styles; => list of beer styles
