import fetch from "isomorphic-unfetch";

const fetcher = async (url: RequestInfo, init?: RequestInit) => {
  const res = await fetch(url, init);

  return await res.json();
};

export default fetcher;
