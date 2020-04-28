import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react";

import { BeerDocument } from "../models/beer";

import Avatar from "./ui/Avatar";
import Card from "./ui/Card";
import Rating from "./ui/Rating";
import colors from "./ui/colors";

type Props = {
  beer: BeerDocument;
};

const BeerCard = ({ beer }: Props) => (
  <Card px="0">
    <div className="flex flex-row items-center px-6">
      <Avatar />

      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <span className={`font-semibold text-${colors.primaryAccent}`}>
            {beer.addedBy.name}
          </span>

          <span className="hidden ml-1 sm:inline-block">rated a beer</span>

          <div className="mx-1">
            <Rating size={4} value={beer.rating} />
          </div>
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
