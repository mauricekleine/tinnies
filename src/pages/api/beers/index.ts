import { NextApiHandler } from "next";
import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import BeerModel, { BeerDocument } from "../../../models/beer";

const handleGetRequest: NextApiHandler<BeerDocument[]> = async (req, res) => {
  const beers = await BeerModel.find().sort({ createdAt: -1 });

  res.status(200).json(beers);
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest); // GET api/beers; => list of beers
