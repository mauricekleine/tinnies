import nextConnect from "next-connect";

import authenticationMiddleware from "../../../middlewares/authentication";
import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import extractUser from "../../../utils/extractUser";

const handleGetRequest: NextAuthenticatedApiHandler = async (req, res) =>
  res.json(extractUser(req.user));

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest); // GET api/users => currently logged in user
