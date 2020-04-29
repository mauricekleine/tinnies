import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import Beer, { BeerDocument } from "../../../models/beer";

const handleGetRequest: NextAuthenticatedApiHandler<BeerDocument[]> = async (
  req,
  res
) => {
  try {
    const beers = await Beer.find({ addedBy: req.user._id })
      .populate("addedBy")
      .populate("brewery")
      .sort({ createdAt: -1 });

    res.status(200).json(beers);
  } catch (e) {
    res.status(503).send(e);
  }
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest); // GET api/my/beers; => list of beers added by user