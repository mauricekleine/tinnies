import bcrypt from "bcryptjs";
import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";

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
  const { email, name: dirtyName, password }: RequestBody = req.body;

  const name = sanitizeString(dirtyName);

  if (!email || !isEmail(email)) {
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
  const result = await User.create({ email, name, password: hashedPassword });

  req.logIn(result, async (err) => {
    if (err) {
      throw err;
    }

    const user = await User.findById(result._id);

    res.status(201).json(user);
  });
};

export default nextConnect().use(commonMiddleware).post(handlePostRequest); // POST api/signup; => sign in
