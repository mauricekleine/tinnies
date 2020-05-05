import React, { useCallback, useMemo } from "react";

type Props = {
  key?: string;
  query: string;
  value: string;
};

const Highlighter = ({ key = "", query, value }: Props) => {
  const regex = useMemo(() => new RegExp(`(${query})`, "i"), [query]);

  const highlight = useCallback(
    (key: string, value: string) => {
      if (query) {
        const substrings = value.split(regex);

        return substrings.filter(Boolean).map((substring) => {
          if (substring.toLowerCase() === query.toLowerCase()) {
            return (
              <span className="font-semibold" key={`${key} - ${substring}`}>
                {substring}
              </span>
            );
          }

          return <span key={`${key} - ${substring}`}>{substring}</span>;
        });
      }

      return value;
    },
    [query, regex]
  );

  return <p>{highlight(key, value)}</p>;
};

export default Highlighter;
