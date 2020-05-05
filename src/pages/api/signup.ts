import bcrypt from "bcryptjs";
import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";

import commonMiddleware from "../../middlewares/common";
import { NextAuthenticatedApiHandler } from "../../middlewares/passport";
import User, { UserDocument } from "../../models/user";
import { sanitizeString } from "../../utils/sanitizers";

type RequestBody = {
  email: UserDocument["email"];
  name: UserDocument["name"];
  password: UserDocument["password"];
};

const handlePostRequest: NextAuthenticatedApiHandler<
  UserDocument | string
> = async (req, res) => {
  const {
    email: dirtyEmail,
    name: dirtyName,
    password,
  }: RequestBody = req.body;

  const name = sanitizeString(dirtyName);
  const email = normalizeEmail(dirtyEmail);

  if (!isEmail(dirtyEmail) || !email) {
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

  const results = await User.countDocuments({ email: email });

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

    res.status(201).json(req.user);
  });
};

export default nextConnect().use(commonMiddleware).post(handlePostRequest); // POST api/signup; => sign in
