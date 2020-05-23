import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useRef } from "react";

import useDropdown from "../hooks/useDropdown";
import useFetch from "../hooks/useFetch";
import { Beer } from "../models/beer";
import { User } from "../models/user";
import { canDeleteBeer } from "../utils/permissions";
import { BEERS_RESOURCE, MY_PROFILE_RESOURCE } from "../utils/resources";

import Avatar from "./ui/Avatar";
import Card from "./ui/Card";
import Rating from "./ui/Rating";
import colors from "./ui/colors";

type Props = {
  beer: Beer;
};

const BeerCard = ({ beer }: Props) => {
  const dropdownRef = useRef();
  const { dropdownProps, handleToggle, isOpen } = useDropdown(dropdownRef, {
    width: "24",
  });
  const { del } = useFetch<Beer[]>(BEERS_RESOURCE);
  const { data: user } = useFetch<User>(MY_PROFILE_RESOURCE);

  const canDelete = canDeleteBeer(beer, user);

  const handleDelete = async () => {
    const result = confirm("Are you sure?");

    if (result) {
      del(beer._id);
    }
  };

  return (
    <Card px="0">
      <div className="flex justify-between px-6">
        <div className="flex items-center">
          <div className="mr-2">
            <Avatar />
          </div>

          <div className="flex flex-col leading-snug">
            <p className="truncate w-40">
              <span className={`font-semibold text-${colors.primaryAccent}`}>
                {`${beer.addedBy.name} `}
              </span>

              <span className="">rated a beer</span>
            </p>

            <span className={`text-${colors.gray} text-sm`}>
              {formatDistanceToNow(new Date(beer.createdAt))} ago
            </span>
          </div>
        </div>

        {canDelete && (
          <div className="relative" ref={dropdownRef}>
            <div className="cursor-pointer -mt-2 p-2" onClick={handleToggle}>
              <FontAwesomeIcon
                className={`text-${colors.gray}`}
                icon={faEllipsisV}
              />
            </div>

            {isOpen && (
              <div {...dropdownProps}>
                <div className="px-4 py-2">
                  <p
                    className={`cursor-pointer p-2 hover:text-${colors.primaryAccent}`}
                    onClick={handleDelete}
                  >
                    Delete
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Image
        alt={`${beer.name} by ${beer.brewery.name}`}
        className="object-cover h-64 my-5 w-full"
        cloudName="tinnies"
        crop="scale"
        publicId={beer.image}
        width="600"
      />

      <div className="px-6">
        <div className="mb-1">
          <Rating value={beer.rating} />
        </div>

        <div className="font-semibold text-xl">{beer.name}</div>

        {beer.style && (
          <div className={`font-semibold text-${colors.primary} text-sm`}>
            {beer.style.name}
          </div>
        )}

        <div className={`text-${colors.gray}`}>{beer.brewery.name}</div>
      </div>
    </Card>
  );
};

export default BeerCard;
