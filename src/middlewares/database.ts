import url from "url";

import { MongoClient } from "mongodb";

const { MONGODB_URI } = process.env;

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function database(req, res, next) {
  if (!client.isConnected()) {
    await client.connect();
  }

  const databaseName = url.parse(MONGODB_URI).pathname.substr(1);

  req.db = await client.db(databaseName);
  req.dbClient = client;

  return next();
}
