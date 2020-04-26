import mongoose from "mongoose";

export type BreweryDocument = {
  name: string;
} & mongoose.Document;

export const BrewerySchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const Brewery: mongoose.Model<BreweryDocument> =
  mongoose.models.Brewery ||
  mongoose.model("Brewery", BrewerySchema);

export default Brewery;
