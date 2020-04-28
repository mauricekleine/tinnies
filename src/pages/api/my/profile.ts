import nextConnect from "next-connect";

import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";
import extractUser from "../../../utils/extractUser";

const handleGetRequest: NextAuthenticatedApiHandler = async (req, res) =>
  res.json(extractUser(req.user));

export default nextConnect().use(commonMiddleware).get(handleGetRequest); // GET api/users => currently logged in user
