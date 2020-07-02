import { Document, Model, Schema, model, models } from "mongoose";

import { Brewery, User } from "../types/graphql";

export type BreweryDocument = Brewery & Document;

export const brewerySchema = new Schema(
  {
    name: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const BreweryModel: Model<BreweryDocument> =
  models.Brewery || model("Brewery", brewerySchema);

export const generateBreweryModel = ({ user }: { user: User }) => ({
  getAll: async () => {
    if (!user) {
      return null;
    }

    return await BreweryModel.find().sort({ name: 1 });
  },
});

export default BreweryModel;
