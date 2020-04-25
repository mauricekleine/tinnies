import nextConnect from "next-connect";

import passport from "../../libs/passport";
import useAuthentication from "../../middlewares/useAuthentication";
import extractUser from "../../utils/extractUser";

const handlePostRequest = (req, res) => {
  res.json({ user: extractUser(req.user) });
};

export default nextConnect()
  .use(useAuthentication)
  .post(passport.authenticate("local"), handlePostRequest); // POST api/login
