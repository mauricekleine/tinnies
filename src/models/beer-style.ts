import { Document, Model, Schema, model, models } from "mongoose";

import { BeerStyle, User } from "../types/graphql";

const beerStyles = [
  "Altbier",
  "Amber Ale",
  "Barley Wine",
  "Berliner Weisse",
  "Bière de Garde",
  "Bitter",
  "Blonde Ale",
  "Bock",
  "Brown Ale",
  "California Common / Steam Beer",
  "Cream Ale",
  "Dortmunder Export",
  "Doppelbock",
  "Dunkel",
  "Dunkelweizen",
  "Eisbock",
  "Flanders Red Ale",
  "Golden Ale / Summer Ale",
  "Gose",
  "Gueuze",
  "Hefeweizen",
  "Helles",
  "India Pale Ale",
  "Kölsch",
  "Lambic",
  "Light Ale",
  "Maibock / Helles Bock",
  "Malt Liquor",
  "Mild",
  "Oktoberfestbier / Märzenbier",
  "Old Ale",
  "Oud Bruin",
  "Pale Ale",
  "Pilsener / Pilsner / Pils",
  "Port",
  "Red Ale",
  "Roggenbier",
  "Saison",
  "Scotch Ale",
  "Stout",
  "Schwarzbier",
  "Vienna lager",
  "Witbier",
  "Weissbier",
  "Weizenbock",
] as const;

export type BeerStyleDocument = BeerStyle & Document;

export const beerStyleSchema = new Schema(
  {
    name: { enum: beerStyles, required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const BeerStyleModel: Model<BeerStyleDocument> =
  models.BeerStyle || model("BeerStyle", beerStyleSchema);

export const generateBeerStyleModel = ({ user }: { user: User }) => ({
  getAll: async () => {
    if (!user) {
      return null;
    }

    return await BeerStyleModel.find().sort({ name: 1 });
  },
});

export default BeerStyleModel;
