import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// passport#160
passport.deserializeUser((req, id, done) => {
  req.db
    .collection("users")
    .findOne(new ObjectId(id))
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      const user = await req.db.collection("users").findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  )
);

export default passport;
