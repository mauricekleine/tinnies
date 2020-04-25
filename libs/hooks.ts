import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useTimeline() {
  const { data = [], error } = useSWR("/api/timeline", fetcher);

  return [data, error];
}

export function useUser() {
  const { data, error } = useSWR("/api/user", fetcher);

  return [data, error];
}
