import React from "react";

import Beer from "../models/beer";

interface Props {
  beer: Beer;
}

const BeerCard = ({ beer }: Props) => (
  <section className="bg-gray-100 max-w-xs rounded overflow-hidden shadow-lg m-2">
    <div className="px-6 py-4">
      <p className="text-gray-700 text-base mb-1">
        {beer.addedBy} on {new Date(beer.addedOn).toDateString()}
      </p>
    </div>

    <img
      className="object-cover rounded-t w-full h-48"
      src={beer.image}
      alt={`${beer.name} by ${beer.brewery}`}
    />

    <div className="px-6 py-4">
      <div className="font-bold text-xl">{beer.name}</div>
      <div className="text-base text-gray-700">{beer.brewery}</div>

      <h4>{new Array(beer.rating).fill("⭐️").join("")}</h4>
    </div>
  </section>
);

export default BeerCard;
