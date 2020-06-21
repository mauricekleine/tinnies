import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import CollectionModel, {
  CollectionDocument,
} from "../../../models/collection";
import { sanitizeString } from "../../../utils/sanitizers";

type RequestBody = {
  beers: CollectionDocument["beers"];
  name: CollectionDocument["name"];
};

const handleGetRequest: NextAuthenticatedApiHandler<
  CollectionDocument[]
> = async (req, res) => {
  try {
    const collections = await CollectionModel.find({
      addedBy: req.user._id,
    }).sort({
      name: 1,
    });

    res.status(200).json(collections);
  } catch (e) {
    res.status(503).send(e);
  }
};

const handlePostRequest: NextAuthenticatedApiHandler<
  CollectionDocument[] | string
> = async (req, res) => {
  const { beers, name: dirtyName }: RequestBody = req.body;

  const name = sanitizeString(dirtyName);

  if (!name) {
    res.status(400).send("There are missing fields");

    return;
  }

  if (!Array.isArray(beers)) {
    res.status(400).send("Invalid beers object");

    return;
  }

  await CollectionModel.create({
    addedBy: req.user.id,
    beers,
    name,
  });

  const collections = await CollectionModel.find({
    addedBy: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.status(201).json(collections);
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest) // GET api/my/collections; => list of collections added by user
  .post(handlePostRequest); // POST api/my/collections; => list of collections added by user
