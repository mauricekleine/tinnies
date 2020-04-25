import connectMongo from "connect-mongo";
import { session } from "next-session";

const MongoStore = connectMongo(session);

export default function (req, res, next) {
  return session({
    store: new MongoStore({
      client: req.dbClient,
      stringify: false,
    }),
  })(req, res, next);
}
