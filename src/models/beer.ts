import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import { Brewery, BreweryDocument } from "./brewery";
import { User, UserDocument } from "./user";

export type BeerRating = 1 | 2 | 3 | 4 | 5;

export type Beer = {
  _id: string;
  addedBy: User | UserDocument;
  brewery: Brewery | BreweryDocument;
  createdAt: string;
  image: string;
  name: string;
  rating: BeerRating;
};

export type BeerDocument = Beer & mongoose.Document;

const beerSchema = new mongoose.Schema(
  {
    addedBy: { ref: "User", type: ObjectId },
    brewery: { ref: "Brewery", type: ObjectId },
    image: { required: true, type: String },
    name: { required: true, type: String },
    rating: { max: 5, min: 1, required: true, type: Number },
  },
  {
    timestamps: true,
  }
);

const BeerModel: mongoose.Model<BeerDocument> =
  mongoose.models.Beer || mongoose.model("Beer", beerSchema);

export default BeerModel;
