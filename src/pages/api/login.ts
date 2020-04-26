import nextConnect from "next-connect";

import commonMiddleware from "../../middlewares/common";
import passport from "../../middlewares/passport";
import extractUser from "../../utils/extractUser";

const handlePostRequest = (req, res) => {
  const user = extractUser(req.user);

  res.json(user || {});
};

export default nextConnect()
  .use(commonMiddleware)
  .post(passport.authenticate("local"), handlePostRequest); // POST api/login
