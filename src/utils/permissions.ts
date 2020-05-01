import { BeerDocument } from "../models/beer";
import { UserDocument } from "../models/user";

const isOwner = (beer: BeerDocument, user: UserDocument) =>
  user && beer.addedBy._id === user._id;

export const canDeleteBeer = isOwner;
