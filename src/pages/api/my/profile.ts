import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import UserModel from "../../../models/user";

const handleDeleteRequest: NextAuthenticatedApiHandler = async (req, res) => {
  await UserModel.findByIdAndDelete(req.user._id);

  req.logOut();
  res.status(204).end();
};

const handleGetRequest: NextAuthenticatedApiHandler = async (req, res) =>
  res.json(req.user);

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .delete(handleDeleteRequest) // DELETE api/my/profile => null
  .get(handleGetRequest); // GET api/my/profile => currently logged in user
