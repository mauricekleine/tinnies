import nextConnect, { NextHandler } from "next-connect";

import database from "./database";
import passport from "./passport";
import session from "./session";

export default nextConnect()
  .use(database)
  .use(session)
  .use(passport.initialize() as NextHandler)
  .use(passport.session());
