import nextConnect from "next-connect";
import isInt from "validator/lib/isInt";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import BeerModel, { BeerDocument } from "../../../models/beer";
import BeerStyleModel, { BeerStyleDocument } from "../../../models/beerStyle";
import BreweryModel, { BreweryDocument } from "../../../models/brewery";
import { sanitizeString } from "../../../utils/sanitizers";

type RequestBody = {
  brewery: BreweryDocument["name"];
  image: BeerDocument["image"];
  name: BeerDocument["name"];
  rating: BeerDocument["rating"];
  style: BeerStyleDocument["name"];
};

const getBreweryByName = async (name: BreweryDocument["name"]) => {
  const brewery = await BreweryModel.findOne({ name });

  if (brewery) {
    return brewery;
  }

  return await BreweryModel.create({ name });
};

const handleGetRequest: NextAuthenticatedApiHandler<BeerDocument[]> = async (
  req,
  res
) => {
  try {
    const beers = await BeerModel.find({ addedBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(beers);
  } catch (e) {
    res.status(503).send(e);
  }
};

const handlePostRequest: NextAuthenticatedApiHandler<
  BeerDocument[] | string
> = async (req, res) => {
  const {
    brewery: dirtyBrewery,
    image,
    name: dirtyName,
    rating,
    style: dirtyStyle,
  }: RequestBody = req.body;

  const breweryName = sanitizeString(dirtyBrewery);
  const name = sanitizeString(dirtyName);
  const styleName = sanitizeString(dirtyStyle) as BeerStyleDocument["name"];

  if (!breweryName || !image || !name || !rating || !styleName) {
    res.status(400).send("There are missing fields");

    return;
  }

  if (!isInt(rating.toString(), { max: 5, min: 1 })) {
    res.status(400).send("Invalid rating");

    return;
  }

  const brewery = await getBreweryByName(breweryName);
  const style = await BeerStyleModel.findOne({ name: styleName });

  await BeerModel.create({
    addedBy: req.user.id,
    brewery: brewery.id,
    image,
    name,
    rating,
    style,
  });

  const beers = await BeerModel.find({ addedBy: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(201).json(beers);
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest) // GET api/my/beers; => list of beers added by user
  .post(handlePostRequest); // POST api/my/beers; => list of beers added by user
