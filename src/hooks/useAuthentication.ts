import { useRouter } from "next/router";
import { useEffect } from "react";

import useUser from "./useUser";

const useAuthentication = ({
  isPublic = false,
  fallback = isPublic ? "/home" : "/",
} = {}) => {
  const router = useRouter();
  const { isValidating, user } = useUser();

  useEffect(() => {
    if (isValidating) {
      return; // data is being loaded
    }

    if ((user && isPublic) || (!user && !isPublic)) {
      router.replace(fallback);
    }

    return;
  }, [fallback, isPublic, isValidating, router, user]);
};

export default useAuthentication;
