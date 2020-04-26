import User from "../models/user";

export default (req) => {
  if (!req.user) {
    return null;
  }

  const { email }: User = req.user;

  return {
    email,
  };
};
