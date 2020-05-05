import nextConnect from "next-connect";

import commonMiddleware from "../../middlewares/common";
import passport, {
  NextAuthenticatedApiHandler,
} from "../../middlewares/passport";
import { UserDocument } from "../../models/user";

const handlePostRequest: NextAuthenticatedApiHandler<UserDocument | string> = (
  req,
  res
) => {
  res.json(req.user);
};

export default nextConnect()
  .use(commonMiddleware)
  .post(passport.authenticate("local"), handlePostRequest); // POST api/login
