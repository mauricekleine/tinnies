import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { NextAuthenticatedApiRequest } from "./passport";

const authenticationMiddleware = (
  req: NextAuthenticatedApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).end();
};

export default authenticationMiddleware;
