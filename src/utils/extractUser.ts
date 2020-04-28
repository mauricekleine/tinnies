import { UserDocument } from "../models/user";

export type ExtractedUser = {
  email: UserDocument["email"];
  id?: UserDocument["id"];
  name: UserDocument["name"];
};

const extractUser = (user?: UserDocument) => {
  if (!user) {
    return null;
  }

  const { email, id, name }: ExtractedUser = user;

  return {
    email,
    id,
    name,
  };
};

export default extractUser;
