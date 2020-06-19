import nextConnect from "next-connect";

import commonMiddleware from "../../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../../middlewares/passport";

const handleDeleteRequest: NextAuthenticatedApiHandler = (req, res) => {
  req.logOut();
  res.status(204).end();
};

export default nextConnect().use(commonMiddleware).delete(handleDeleteRequest);