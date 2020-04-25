import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useTimeline() {
  const { data = [], mutate } = useSWR("/api/timeline", fetcher);

  return [data, { mutate }];
}

export function useUser() {
  const { data, mutate } = useSWR("/api/me", fetcher);
  const user = data && data.user;

  return [user, { mutate }];
}
