import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

import BeerModel, { Beer } from "./beer";
import UserModel, { User, UserDocument } from "./user";

export type Collection = {
  _id: string;
  addedBy: User | UserDocument;
  beers: Beer[];
  name: string;
};

export type CollectionDocument = Collection & mongoose.Document;

export const collectionSchema = new mongoose.Schema(
  {
    addedBy: {
      autopopulate: { select: "_id, name" },
      ref: UserModel,
      required: true,
      type: ObjectId,
    },
    beers: [{ autopopulate: true, ref: BeerModel, type: ObjectId }],
    name: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

collectionSchema.plugin(autopopulate);

const CollectionModel: mongoose.Model<CollectionDocument> =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default CollectionModel;
