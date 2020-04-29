import { UserDocument } from "../models/user";

export type ExtractedUser = {
  _id?: UserDocument["id"];
  email: UserDocument["email"];
  name: UserDocument["name"];
};

const extractUser = (user?: UserDocument) => {
  if (!user) {
    return null;
  }

  const { _id, email, name }: ExtractedUser = user;

  return {
    _id,
    email,
    name,
  };
};

export default extractUser;
