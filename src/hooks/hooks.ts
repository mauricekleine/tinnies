import useSWR from "swr";

import { BeerDocument } from "../models/beer";
import { UserDocument } from "../models/user";

const fetcher = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

export const useBeers = () => {
  const { data: beers = [], mutate } = useSWR<BeerDocument[]>(
    "/api/beers",
    fetcher
  );

  return { beers, mutate };
};

export const useMyBeers = () => {
  const { data: beers = [], mutate } = useSWR<BeerDocument[]>(
    "/api/my/beers",
    fetcher
  );

  return { beers, mutate };
};

export const useUser = () => {
  const { data: user, mutate } = useSWR<UserDocument>(
    "/api/my/profile",
    fetcher
  );

  return { mutate, user };
};
