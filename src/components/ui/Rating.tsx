import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { BeerDocument } from "../../models/beer";

import colors from "./colors";

const RATING_VALUES: BeerDocument["rating"][] = [1, 2, 3, 4, 5];

type Props = {
  onClick?: (rating: BeerDocument["rating"]) => void;
  size?: string;
  value: BeerDocument["rating"];
};

const Rating = ({ onClick, size = "6", value }: Props) => (
  <div className="flex items-center -ml-2">
    {RATING_VALUES.map((rating) => (
      <div className="px-1" key={rating}>
        <FontAwesomeIcon
          className={`h-${size} text-${colors.yellow} w-${size}`}
          icon={rating <= value ? fasStar : farStar}
          onClick={() => onClick && onClick(rating)}
        />
      </div>
    ))}
  </div>
);

export default Rating;
