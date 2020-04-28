import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { BeerDocument } from "../../models/beer";

import colors from "./colors";

const RATING_VALUES: BeerDocument["rating"][] = [1, 2, 3, 4, 5];

type Props = {
  onClick?: (rating: BeerDocument["rating"]) => void;
  value: BeerDocument["rating"];
};

const Rating = ({ onClick, value }: Props) => (
  <div className="-ml-2">
    {RATING_VALUES.map((rating) => (
      <div className="inline-block px-1" key={rating}>
        <FontAwesomeIcon
          className={`h-6 text-${colors.yellow} w-6`}
          icon={rating <= value ? fasStar : farStar}
          onClick={() => onClick && onClick(rating)}
        />
      </div>
    ))}
  </div>
);

export default Rating;
