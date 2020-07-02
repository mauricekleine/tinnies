import { Collection } from "../types/graphql";
import { Beer } from "../types/graphql";
import { User } from "../types/graphql";

export const canDeleteBeer = (beer: Beer, user: User): boolean =>
  beer.addedBy.id === user.id;

export const canDeleteCollection = (
  collection: Collection,
  user: User
): boolean => collection.addedBy.id === user.id;

export const canDeleteUser = (userToBeDelete: User, user: User): boolean =>
  userToBeDelete.id === user.id;
