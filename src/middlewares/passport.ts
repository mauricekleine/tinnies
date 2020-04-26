import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User, { UserDocument } from "../models/user";

export type NextAuthenticatedApiRequest = {
  logIn(user: UserDocument, done: (err: any) => void): void;
  logOut: () => void;
  user: UserDocument;
} & NextApiRequest;

export type NextAuthenticatedApiHandler<T = any> = (
  req: NextAuthenticatedApiRequest,
  res: NextApiResponse<T>
) => void;

passport.serializeUser((user: UserDocument, done) => {
  done(null, user.id.toString());
});

passport.deserializeUser(async (req, id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  )
);

export default passport;
