import nextConnect from "next-connect";

import passport from "../libs/passport";

import database from "./database";
import session from "./session";

export default nextConnect()
  .use(database)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());
