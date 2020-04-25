import bcrypt from "bcryptjs";
import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";

import useAuthentication from "../../middlewares/useAuthentication";
import extractUser from "../../utils/extractUser";

const handlePostRequest = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }

  if (!password || password.length <= 8) {
    res.status(400).send("The password you entered is invalid");
    return;
  }

  const results = await req.db
    .collection("users")
    .countDocuments({ email: normalizedEmail });

  if (results > 0) {
    res.status(403).send("The email has already been used.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await req.db
    .collection("users")
    .insertOne({ email, password: hashedPassword })
    .then(({ ops }) => ops[0]);

  req.logIn(user, (err) => {
    if (err) {
      throw err;
    }

    res.status(201).json({
      user: extractUser(req),
    });
  });
};

export default nextConnect().use(useAuthentication).post(handlePostRequest); // POST api/signup; => sign in
