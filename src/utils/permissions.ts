import { Beer, BeerDocument } from "../models/beer";
import { Collection, CollectionDocument } from "../models/collection";
import { User, UserDocument } from "../models/user";

export const canDeleteBeer = (
  beer: Beer | BeerDocument,
  user: User | UserDocument
) => user && beer.addedBy._id === user._id;

export const canDeleteCollection = (
  collection: Collection | CollectionDocument,
  user: User | UserDocument
) => user && collection.addedBy._id === user._id;
