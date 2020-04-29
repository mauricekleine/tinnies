import { NextApiHandler } from "next";
import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import Beer, { BeerDocument } from "../../../models/beer";
import Brewery, { BreweryDocument } from "../../../models/brewery";

const getBreweryByName = async (name: BreweryDocument["name"]) => {
  const brewery = await Brewery.findOne({ name });

  if (brewery) {
    return brewery;
  }

  return await Brewery.create({ name });
};

const handleGetRequest: NextApiHandler<BeerDocument[]> = async (req, res) => {
  const beers = await Beer.find()
    .populate("addedBy")
    .populate("brewery")
    .sort({ createdAt: -1 });

  res.status(200).json(beers);
};

const handlePostRequest: NextAuthenticatedApiHandler<
  BeerDocument[] | string
> = async (req, res) => {
  const { brewery: breweryName, image, name, rating } = req.body;

  if (!breweryName || !image || !name || !rating) {
    res.status(400).send("There are missing fields");

    return;
  }

  const brewery = await getBreweryByName(breweryName);

  await Beer.create({
    addedBy: req.user.id,
    brewery: brewery.id,
    image,
    name,
    rating,
  });

  const beers = await Beer.find()
    .populate("addedBy")
    .populate("brewery")
    .sort({ createdAt: -1 });

  res.status(201).json(beers);
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest) // GET api/beers; => list of beers
  .post(handlePostRequest); // POST api/beers; => list of beers
