import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

import { BeerRating } from "../../models/beer";

import Theme from "./theme";

const RATING_VALUES: BeerRating[] = [1, 2, 3, 4, 5];

type Props = {
  disabled?: boolean;
  onClick?: (rating: BeerRating) => void;
  size?: number;
  value: BeerRating;
};

const Rating = ({ disabled = false, onClick, size = 1, value }: Props) => (
  <Theme>
    {({ colors }) => (
      <div className={`flex items-center space-x-${size}`}>
        {RATING_VALUES.map((rating) => (
          <div key={rating}>
            <FontAwesomeIcon
              className={classNames({
                [`text-${colors.grayLight}`]: disabled,
                [`text-${colors.yellow}`]: !disabled,
              })}
              icon={rating <= value ? fasStar : farStar}
              onClick={() => onClick && onClick(rating)}
              size={`${size}x` as SizeProp}
            />
          </div>
        ))}
      </div>
    )}
  </Theme>
);

export default Rating;
