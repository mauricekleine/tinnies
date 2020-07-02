import { Document, Model, Schema, model, models } from "mongoose";
import autopopulate from "mongoose-autopopulate";
import isInt from "validator/lib/isInt";
import isMongoId from "validator/lib/isMongoId";

import { Beer, User } from "../types/graphql";
import { canDeleteBeer } from "../utils/permissions";
import { sanitizeString } from "../utils/sanitizers";

import BeerStyleModel from "./beer-style";
import BreweryModel from "./brewery";
import UserModel from "./user";

type BeerDocument = Beer & Document;

const beerSchema = new Schema(
  {
    addedBy: {
      autopopulate: { select: "_id, name" },
      ref: UserModel,
      required: true,
      type: Schema.Types.ObjectId,
    },
    brewery: {
      autopopulate: true,
      ref: BreweryModel,
      required: true,
      type: Schema.Types.ObjectId,
    },
    image: { required: true, type: String },
    name: { required: true, type: String },
    rating: { max: 5, min: 1, required: true, type: Number },
    style: {
      autopopulate: true,
      ref: BeerStyleModel,
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
).plugin(autopopulate);

const BeerModel: Model<BeerDocument> = models.Beer || model("Beer", beerSchema);

const getBrewery = async (
  idOrName: Beer["brewery"]["id"] | Beer["brewery"]["name"]
) => {
  if (isMongoId(idOrName)) {
    return await BreweryModel.findById(idOrName);
  }

  return await BreweryModel.create({ name: idOrName });
};

export const generateBeerModel = ({ user }: { user: User }) => ({
  createBeer: async (
    brewery: Beer["brewery"]["id"] | Beer["brewery"]["name"],
    image: Beer["image"],
    dirtyName: Beer["name"],
    rating: Beer["rating"],
    styleId: Beer["style"]["id"]
  ) => {
    const name = sanitizeString(dirtyName);
    const styleDocument = await BeerStyleModel.findById(styleId);

    if (!brewery || !image || !name || !rating || !styleDocument) {
      return null;
    }

    if (!isInt(rating.toString(), { max: 5, min: 1 })) {
      return null;
    }

    const breweryDocument = await getBrewery(brewery);

    return await BeerModel.create({
      addedBy: user.id as any,
      brewery: breweryDocument.id,
      image,
      name,
      rating,
      style: styleDocument.id,
    });
  },

  deleteBeer: async (id: Beer["id"]) => {
    const beer = await BeerModel.findById(id);

    if (beer && canDeleteBeer(beer, user)) {
      await BeerModel.findByIdAndDelete(id);

      return id;
    }

    return null;
  },

  getAll: async () => {
    if (!user) {
      return null;
    }

    return await BeerModel.find().sort({ createdAt: -1 });
  },

  getAllForUser: async () => {
    if (!user) {
      return null;
    }

    return await BeerModel.find({ addedBy: user.id } as any).sort({
      createdAt: -1,
    });
  },
});

export default BeerModel;
