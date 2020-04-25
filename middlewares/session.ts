import connectMongo from "connect-mongo";
import { MemoryStore, Store, promisifyStore, session } from "next-session";

const MongoStore = connectMongo({ MemoryStore, Store } as any);

export default function (req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient, // see how we use req.dbClient from the previous step
    stringify: false,
  });
  return session({
    store: promisifyStore(mongoStore),
  })(req, res, next);
}
