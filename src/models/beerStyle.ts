import mongoose from "mongoose";

export const beerStyles = [
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

export type BeerStyle = {
  _id: string;
  name: typeof beerStyles[number];
};

export type BeerStyleDocument = BeerStyle & mongoose.Document;

export const BeerStyleSchema = new mongoose.Schema(
  {
    name: { enum: beerStyles, required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const BeerStyleModel: mongoose.Model<BeerStyleDocument> =
  mongoose.models.BeerStyle || mongoose.model("BeerStyle", BeerStyleSchema);

export default BeerStyleModel;
