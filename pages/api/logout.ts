import nextConnect from "next-connect";

import useAuthentication from "../../middlewares/useAuthentication";

const handleDeleteRequest = (req, res) => {
  req.logOut();
  res.status(204).end();
}

export default nextConnect()
  .use(useAuthentication)
  .delete(handleDeleteRequest); // POST api/login
