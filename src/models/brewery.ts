import mongoose from "mongoose";

export type Brewery = {
  _id: string;
  name: string;
};

export type BreweryDocument = Brewery & mongoose.Document;

export const BrewerySchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const BreweryModel: mongoose.Model<BreweryDocument> =
  mongoose.models.Brewery || mongoose.model("Brewery", BrewerySchema);

export default BreweryModel;
