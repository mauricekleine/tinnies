import nextConnect from "next-connect";

import commonMiddleware from "../../middlewares/common";

const handleDeleteRequest = (req, res) => {
  req.logOut();
  res.status(204).end();
};

export default nextConnect()
  .use(commonMiddleware)
  .delete(handleDeleteRequest); // POST api/login
