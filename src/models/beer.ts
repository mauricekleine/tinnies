import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import { BreweryDocument } from "./brewery";
import { UserDocument } from "./user";

export type BeerDocument = {
  addedBy: UserDocument;
  brewery: BreweryDocument;
  createdAt: string;
  image: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
} & mongoose.Document;

const beerSchema = new mongoose.Schema(
  {
    addedBy: { ref: "User", type: ObjectId },
    brewery: { ref: "Brewery", type: ObjectId },
    image: { required: true, type: String },
    name: { required: true, type: String },
    rating: { required: true, type: Number },
  },
  {
    timestamps: true,
  }
);

const Beer: mongoose.Model<BeerDocument> =
  mongoose.models.Beer || mongoose.model("Beer", beerSchema);

export default Beer;
