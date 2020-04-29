import useSWR from "swr";

import { UserDocument } from "../models/user";
import { READ_MY_PROFILE_RESOURCE } from "../utils/endpoints";

const useUser = () => {
  const { data: user, error, isValidating, mutate } = useSWR<UserDocument>(
    READ_MY_PROFILE_RESOURCE,
    {
      shouldRetryOnError: false,
    }
  );

  return {
    error,
    isValidating,
    mutate: mutate,
    user,
  };
};

export default useUser;
