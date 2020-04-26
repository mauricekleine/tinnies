import { UserDocument } from "../models/user";

export type ExtractedUser = {
  email: UserDocument["email"];
  id?: UserDocument["id"];
};

const extractUser = (user?: UserDocument) => {
  if (!user) {
    return null;
  }

  const { email, id }: ExtractedUser = user;

  return {
    email,
    id,
  };
};

export default extractUser;
