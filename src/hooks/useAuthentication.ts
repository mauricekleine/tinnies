import { useRouter } from "next/router";
import { useEffect } from "react";

import { useUser } from "./hooks";

const useAuthentication = (fallback = "/") => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user || user === undefined) {
      return;
    }

    router.replace(fallback);
    return;
  }, [fallback, router, user]);
};

export default useAuthentication;
