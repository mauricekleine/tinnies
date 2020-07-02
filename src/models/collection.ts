import { Document, Model, Schema, model, models } from "mongoose";
import autopopulate from "mongoose-autopopulate";

import { Beer, Collection, User } from "../types/graphql";
import { canDeleteCollection } from "../utils/permissions";
import { sanitizeString } from "../utils/sanitizers";

import BeerModel from "./beer";
import UserModel from "./user";

export type CollectionDocument = Collection & Document;

export const collectionSchema = new Schema(
  {
    addedBy: {
      autopopulate: { select: "_id, name" },
      ref: UserModel,
      required: true,
      type: Schema.Types.ObjectId,
    },
    beers: [
      { autopopulate: true, ref: BeerModel, type: Schema.Types.ObjectId },
    ],
    name: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

collectionSchema.plugin(autopopulate);

const CollectionModel: Model<CollectionDocument> =
  models.Collection || model("Collection", collectionSchema);

export const generateCollectionsModel = ({ user }: { user: User }) => ({
  createCollection: async (
    beerIds: Beer["id"][],
    dirtyName: Collection["name"]
  ) => {
    const name = sanitizeString(dirtyName);

    if (!name && !Array.isArray(beerIds)) {
      return null;
    }

    return await CollectionModel.create({
      addedBy: user.id as any,
      beers: beerIds as any,
      name,
    });
  },

  deleteCollection: async (id: Collection["id"]) => {
    const collection = await CollectionModel.findById(id);

    if (collection && canDeleteCollection(collection, user)) {
      await CollectionModel.findByIdAndDelete(id);
    }

    return await CollectionModel.find().sort({ createdAt: -1 });
  },

  getAllForUser: async () => {
    if (!user) {
      return null;
    }

    return await CollectionModel.find({ addedBy: user.id as any }).sort({
      name: 1,
    });
  },
});

export default CollectionModel;
