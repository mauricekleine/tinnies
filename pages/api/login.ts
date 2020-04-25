import nextConnect from "next-connect";

import passport from "../../libs/passport";
import commonMiddleware from "../../middlewares/common";
import extractUser from "../../utils/extractUser";

const handlePostRequest = (req, res) => {
  res.json({ user: extractUser(req.user) });
};

export default nextConnect()
  .use(commonMiddleware)
  .post(passport.authenticate("local"), handlePostRequest); // POST api/login
