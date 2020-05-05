import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import Beer, { BeerDocument } from "../../../models/beer";
import Brewery from "../../../models/brewery";
import User from "../../../models/user";
import { canDeleteBeer } from "../../../utils/permissions";

const handleDeleteRequest: NextAuthenticatedApiHandler<
  BeerDocument[] | string
> = async (req, res) => {
  const { _id } = req.query;

  const beer = await Beer.findById(_id);

  if (!beer) {
    res.status(400).send("Invalid id");

    return;
  }

  if (canDeleteBeer(beer, req.user)) {
    res.status(403).send("Unauthorized");

    return;
  }

  await Beer.findByIdAndDelete(_id);

  const beers = await Beer.find()
    .populate({ model: User, path: "addedBy", select: "_id, name" })
    .populate({ model: Brewery, path: "brewery" })
    .sort({ createdAt: -1 });

  res.status(200).json(beers);
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .delete(handleDeleteRequest); // DELETE api/beers/:id => list of beers
