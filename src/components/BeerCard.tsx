import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
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
import { Icon } from "./ui/Icon";
import Rating from "./ui/Rating";
import { FinePrint, HeadingOne, Muted, UserName } from "./ui/Typography";
import { ButtonLink } from "./ui/buttons";

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
              <UserName>{beer.addedBy.name}</UserName>

              <span> rated a beer</span>
            </p>

            <FinePrint>
              {formatDistanceToNow(new Date(beer.createdAt))} ago
            </FinePrint>
          </div>
        </div>

        {canDelete && (
          <div className="relative" ref={dropdownRef}>
            <div className="cursor-pointer -mt-2 p-2" onClick={handleToggle}>
              <Icon icon={faEllipsisV} />
            </div>

            {isOpen && (
              <div {...dropdownProps}>
                <div className="px-4 py-2">
                  <ButtonLink onClick={handleDelete}>Delete</ButtonLink>
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

        <HeadingOne>{beer.name}</HeadingOne>

        {beer.style && (
          <p>
            <Muted>{beer.style.name}</Muted>
          </p>
        )}

        <Muted>{beer.brewery.name}</Muted>
      </div>
    </Card>
  );
};

export default BeerCard;
