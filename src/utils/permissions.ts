import { Beer, BeerDocument } from "../models/beer";
import { User, UserDocument } from "../models/user";

const isOwner = (beer: Beer | BeerDocument, user: User | UserDocument) =>
  user && beer.addedBy._id === user._id;

export const canDeleteBeer = isOwner;
