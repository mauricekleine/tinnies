import { NextApiHandler } from "next";
import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import Brewery, { BreweryDocument } from "../../../models/brewery";

const handleGetRequest: NextApiHandler<BreweryDocument[]> = async (
  req,
  res
) => {
  const breweries = await Brewery.find().sort({ createdAt: -1 });

  res.status(200).json(breweries);
};
export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest); // GET api/breweries; => list of breweries
