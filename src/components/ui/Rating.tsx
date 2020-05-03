import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { BeerDocument } from "../../models/beer";

import colors from "./colors";

const RATING_VALUES: BeerDocument["rating"][] = [1, 2, 3, 4, 5];

type Props = {
  color?: string;
  onClick?: (rating: BeerDocument["rating"]) => void;
  size?: number;
  value: BeerDocument["rating"];
};

const Rating = ({ color = colors.yellow, onClick, size = 1, value }: Props) => (
  <div className={`flex items-center ${size > 1 && "-ml-1"}`}>
    {RATING_VALUES.map((rating) => (
      <div className={size > 1 ? "px-1" : "pr-1"} key={rating}>
        <FontAwesomeIcon
          className={`text-${color}`}
          icon={rating <= value ? fasStar : farStar}
          onClick={() => onClick && onClick(rating)}
          size={`${size}x` as SizeProp}
        />
      </div>
    ))}
  </div>
);

export default Rating;
