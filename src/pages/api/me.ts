import nextConnect from "next-connect";

import commonMiddleware from "../../middlewares/common";
import extractUser from "../../utils/extractUser";

const handleGetRequest = async (req, res) =>
  res.json({ user: extractUser(req) });

export default nextConnect()
  .use(commonMiddleware)
  .get(handleGetRequest) // GET api/users => currently logged in user
