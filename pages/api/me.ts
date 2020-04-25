import nextConnect from "next-connect";

import useAuthentication from "../../middlewares/useAuthentication";
import extractUser from "../../utils/extractUser";

const handleGetRequest = async (req, res) =>
  res.json({ user: extractUser(req) });

export default nextConnect()
  .use(useAuthentication)
  .get(handleGetRequest) // GET api/users => currently logged in user
