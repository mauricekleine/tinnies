import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react";

import { BeerDocument } from "../models/beer";

import { Button } from "./ui/Buttons";
import Card from "./ui/Card";
import Rating from "./ui/Rating";
import colors from "./ui/colors";

type Props = {
  beer: BeerDocument;
};

const BeerCard = ({ beer }: Props) => (
  <Card px="0">
    <div className="flex flex-row items-center px-6">
      <div
        className={`bg-${colors.grayLight} flex h-10 items-center justify-center mr-2 rounded-full w-10`}
      >
        <FontAwesomeIcon
          className={`h-5 text-${colors.white} w-5`}
          icon={faUser}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <span className={`font-semibold text-${colors.primaryAccent}`}>
            {beer.addedBy.name}
          </span>

          <span className="ml-1 mr-2">rated a beer</span>

          <Rating size="4" value={beer.rating} />
        </div>

        <span className={`text-${colors.gray} text-sm`}>
          {formatDistanceToNow(new Date(beer.createdAt))} ago
        </span>
      </div>
    </div>

    <Image
      alt={`${beer.name} by ${beer.brewery.name}`}
      className="object-cover h-64 my-6 w-full"
      cloudName="tinnies"
      crop="scale"
      publicId={beer.image}
      width="600"
    />

    <div className="px-6">
      <div className="font-semibold text-xl">{beer.name}</div>
      <div className={`text-${colors.gray}`}>{beer.brewery.name}</div>
    </div>
  </Card>
);

export default BeerCard;
