import nextConnect from "next-connect";

import commonMiddleware from "../../middlewares/common";
import passport, {
  NextAuthenticatedApiHandler,
} from "../../middlewares/passport";
import extractUser, { ExtractedUser } from "../../utils/extractUser";

const handlePostRequest: NextAuthenticatedApiHandler<ExtractedUser> = (
  req,
  res
) => {
  const user = extractUser(req.user);

  res.json(user);
};

export default nextConnect()
  .use(commonMiddleware)
  .post(passport.authenticate("local"), handlePostRequest); // POST api/login
