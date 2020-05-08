import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

import BeerStyleModel, { BeerStyle, BeerStyleDocument } from "./beerStyle";
import BreweryModel, { Brewery, BreweryDocument } from "./brewery";
import UserModel, { User, UserDocument } from "./user";

export type BeerRating = 1 | 2 | 3 | 4 | 5;

export type Beer = {
  _id: string;
  addedBy: User | UserDocument;
  brewery: Brewery | BreweryDocument;
  collections: [{ autopopulate: true; ref: "Collection"; type: ObjectId }];
  createdAt: string;
  image: string;
  name: string;
  rating: BeerRating;
  style: BeerStyle | BeerStyleDocument;
};

export type BeerDocument = Beer & mongoose.Document;

const beerSchema = new mongoose.Schema(
  {
    addedBy: {
      autopopulate: { select: "_id, name" },
      ref: UserModel,
      required: true,
      type: ObjectId,
    },
    brewery: {
      autopopulate: true,
      ref: BreweryModel,
      required: true,
      type: ObjectId,
    },
    image: { required: true, type: String },
    name: { required: true, type: String },
    rating: { max: 5, min: 1, required: true, type: Number },
    style: {
      autopopulate: true,
      ref: BeerStyleModel,
      required: true,
      type: ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

beerSchema.plugin(autopopulate);

const BeerModel: mongoose.Model<BeerDocument> =
  mongoose.models.Beer || mongoose.model("Beer", beerSchema);

export default BeerModel;
