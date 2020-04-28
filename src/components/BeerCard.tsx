import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "cloudinary-react";
import React from "react";

import { BeerDocument } from "../models/beer";

import Card from "./ui/Card";
import colors from "./ui/colors";

type Props = {
  beer: BeerDocument;
};

const BeerCard = ({ beer }: Props) => (
  <Card>
    <div className="flex flex-row items-center">
      <div
        className={`bg-${colors.grayLight} flex h-10 items-center justify-center mr-2 rounded-full w-10`}
      >
        <FontAwesomeIcon
          className={`h-5 text-${colors.white} w-5`}
          icon={faUser}
        />
      </div>

      <div className="flex flex-col">
        <span className={`font-semibold text-${colors.primaryAccent}`}>
          {beer.addedBy.name}
        </span>

        <span className={`text-${colors.gray} text-sm`}>
          {new Date(beer.createdAt).toDateString()}
        </span>
      </div>
    </div>

    <Image
      alt={`${beer.name} by ${beer.brewery.name}`}
      className="object-cover h-64 my-4 rounded-t w-full"
      cloudName="tinnies"
      crop="scale"
      publicId={beer.image}
      width="300"
    />

    <div className="font-semibold text-xl">{beer.name}</div>
    <div className={`text-${colors.gray}`}>{beer.brewery.name}</div>

    <h4>{new Array(beer.rating).fill("⭐️").join("")}</h4>
  </Card>
);

export default BeerCard;
