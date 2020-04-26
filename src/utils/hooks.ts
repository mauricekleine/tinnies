import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import User from "../models/user";

const fetcher = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

export const useTimeline = () => {
  const { data = [], mutate } = useSWR("/api/timeline", fetcher);

  return [data, { mutate }];
};

export const useUser = () => {
  const { data: user, mutate } = useSWR<User>("/api/me", fetcher);

  return { mutate, user };
};

export const useAuthentication = (fallback = "/") => {
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
