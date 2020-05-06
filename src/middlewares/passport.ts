import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import isEmail from "validator/lib/isEmail";

import User, { UserDocument } from "../models/user";

export type NextAuthenticatedApiRequest = {
  isAuthenticated: () => boolean;
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
    async (req, providedEmail: string, providedPassword: string, done) => {
      if (!providedEmail || !isEmail(providedEmail)) {
        return done(null, false);
      }

      const result = await User.findOne({ email: providedEmail }, "+password");

      if (!result) {
        return done(null, false);
      }

      const passwordMatches = await bcrypt.compare(
        providedPassword,
        result.password
      );

      if (!passwordMatches) {
        return done(null, false);
      }

      const user = await User.findOne({ email: providedEmail });

      return done(null, user);
    }
  )
);

export default passport;
