import escapeStringRegexp from "escape-string-regexp";
import { useMemo } from "react";

type Props = {
  id?: string;
  query: string;
  value: string;
};

const Highlighter = ({ id = "", query, value }: Props) => {
  const regex = useMemo(
    () => new RegExp(`(${escapeStringRegexp(query)})`, "i"),
    [query]
  );

  if (query) {
    const substrings = value.split(regex);

    return (
      <>
        {substrings.filter(Boolean).map((substring, index) => {
          if (substring.toLowerCase() === query.toLowerCase()) {
            return (
              <span
                className="font-semibold"
                key={`${id}-${index}-${substring}`}
              >
                {substring}
              </span>
            );
          }

          return <span key={`${id}-${index}-${substring}`}>{substring}</span>;
        })}
      </>
    );
  }

  return <span>{value}</span>;
};

export default Highlighter;
