import bcrypt from "bcryptjs";
import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";

import commonMiddleware from "../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../middlewares/passport";
import User from "../../models/user";
import extractUser from "../../utils/extractUser";

const handlePostRequest: NextAuthenticatedApiHandler = async (req, res) => {
  const { email, name, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }

  if (!password || password.length <= 8) {
    res.status(400).send("The password you entered is invalid");
    return;
  }

  if (!name) {
    res.status(400).send("Please enter a name");
    return;
  }

  const results = await User.countDocuments({ email: normalizedEmail });

  if (results > 0) {
    res.status(403).send("The email has already been used.");

    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, password: hashedPassword });

  req.logIn(user, (err) => {
    if (err) {
      throw err;
    }

    res.status(201).json(extractUser(req.user));
  });
};

export default nextConnect().use(commonMiddleware).post(handlePostRequest); // POST api/signup; => sign in
