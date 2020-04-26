import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { MemoryStore, Store, promisifyStore, session } from "next-session";

const MongoStore = connectMongo({ MemoryStore, Store } as any);

const withSession = (req, res: NextApiResponse, next: NextHandler) => {
  const mongoStore = new MongoStore({
    mongooseConnection: mongoose.connection,
  });

  return session({
    store: promisifyStore(mongoStore),
  })(req, res, next);
};

export default withSession;
