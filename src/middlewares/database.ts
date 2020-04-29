import mongoose from "mongoose";
import { Middleware } from "next-connect";

import "../models/beer";
import "../models/brewery";
import "../models/user";

mongoose.set("useCreateIndex", true);

const database: Middleware = async (req, res, next) => {
  if (mongoose.connections[0].readyState) {
    return next();
  }

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return next();
};

export default database;
