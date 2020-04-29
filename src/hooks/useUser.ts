import useSWR from "swr";

import { UserDocument } from "../models/user";

const useUser = () => {
  const { data: user, isValidating, mutate } = useSWR<UserDocument>("/api/my/profile");

  return { isValidating, mutate, user };
};

export default useUser;
