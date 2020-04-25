import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export const useTimeline = () => {
  const { data = [], mutate } = useSWR("/api/timeline", fetcher);

  return [data, { mutate }];
};

export const useUser = () => {
  const { data, mutate } = useSWR("/api/me", fetcher);
  const user = data && data.user;

  return [user, { mutate }];
};

export const useAuthentication = (fallback = "/") => {
  const router = useRouter();
  const [user] = useUser();

  useEffect(() => {
    if (user) {
      return;
    }

    router.replace(fallback);
    return;
  }, [fallback, router, user]);
};
