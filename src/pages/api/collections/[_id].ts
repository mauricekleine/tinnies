import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import CollectionModel, {
  CollectionDocument,
} from "../../../models/collection";
import { canDeleteCollection } from "../../../utils/permissions";

const handleDeleteRequest: NextAuthenticatedApiHandler<
  CollectionDocument[] | string
> = async (req, res) => {
  const { _id } = req.query;

  const collection = await CollectionModel.findById(_id);

  if (!collection) {
    res.status(400).send("Invalid id");

    return;
  }

  if (canDeleteCollection(collection, req.user)) {
    res.status(403).send("Unauthorized");

    return;
  }

  await CollectionModel.findByIdAndDelete(_id);

  const collections = await CollectionModel.find().sort({ createdAt: -1 });

  res.status(200).json(collections);
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .delete(handleDeleteRequest); // DELETE api/beers/:id => list of beers
