import React from "react";

import { BeerDocument } from "../models/beer";

import Card from "./ui/Card";

type Props = {
  beer: BeerDocument;
};

const BeerCard = ({ beer }: Props) => (
  <Card>
    <div className="px-6 py-4">
      <p className="text-gray-700 text-base mb-1">
        {beer.addedBy.email} on {new Date(beer.createdAt).toDateString()}
      </p>
    </div>

    <img
      className="object-cover rounded-t w-full h-64"
      src={beer.image}
      alt={`${beer.name} by ${beer.brewery.name}`}
    />

    <div className="px-6 py-4">
      <div className="font-bold text-xl">{beer.name}</div>
      <div className="text-base text-gray-700">{beer.brewery.name}</div>

      <h4>{new Array(beer.rating).fill("⭐️").join("")}</h4>
    </div>
  </Card>
);

export default BeerCard;
