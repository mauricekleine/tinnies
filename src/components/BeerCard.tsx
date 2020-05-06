import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react";

import useFetch from "../hooks/useFetch";
import { Beer } from "../models/beer";
import { User } from "../models/user";
import { canDeleteBeer } from "../utils/permissions";
import {
  READ_BEERS_RESOURCE,
  READ_MY_PROFILE_RESOURCE,
} from "../utils/resources";

import Avatar from "./ui/Avatar";
import Card from "./ui/Card";
import Dropdown from "./ui/Dropdown";
import Rating from "./ui/Rating";
import colors from "./ui/colors";

type Props = {
  beer: Beer;
};

const BeerCard = ({ beer }: Props) => {
  const { del } = useFetch<Beer[]>(`${READ_BEERS_RESOURCE}/${beer._id}`, {
    cacheKey: READ_BEERS_RESOURCE,
  });
  const { data: user } = useFetch<User>(READ_MY_PROFILE_RESOURCE);

  const canDelete = canDeleteBeer(beer, user);

  const handleDelete = async () => {
    const result = confirm("Are you sure?");

    if (result) {
      await del();
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
          <Dropdown width={24}>
            {({ dropdownProps, handleToggle, isOpen }) => (
              <>
                <div
                  className="cursor-pointer -mt-2 p-2"
                  onClick={handleToggle}
                >
                  <FontAwesomeIcon
                    className={`text-${colors.gray}`}
                    icon={faEllipsisV}
                  />
                </div>

                {isOpen && (
                  <div {...dropdownProps}>
                    <div className="flex flex-col px-4 py-2">
                      {/* <span className="p-2">
                        <FontAwesomeIcon
                          className={`mr-2 text-${colors.gray}`}
                          fixedWidth
                          icon={faEdit}
                        />
                        Edit
                      </span> */}

                      <p
                        className={`cursor-pointer p-2 hover:color-${colors.primaryAccent}`}
                        onClick={handleDelete}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </Dropdown>
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
        <div className={`text-${colors.gray}`}>{beer.brewery.name}</div>
      </div>
    </Card>
  );
};

export default BeerCard;
