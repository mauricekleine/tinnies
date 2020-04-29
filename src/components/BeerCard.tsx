import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react";

import useFetch from "../hooks/useFetch";
import useUser from "../hooks/useUser";
import { BeerDocument } from "../models/beer";
import { READ_BEERS_RESOURCE } from "../utils/endpoints";
import { canDeleteBeer } from "../utils/permissions";

import Avatar from "./ui/Avatar";
import Card from "./ui/Card";
import Dropdown from "./ui/Dropdown";
import Rating from "./ui/Rating";
import colors from "./ui/colors";

type Props = {
  beer: BeerDocument;
};

const BeerCard = ({ beer }: Props) => {
  const { del } = useFetch(`${READ_BEERS_RESOURCE}/${beer._id}`);
  const { user } = useUser();

  const canDelete = canDeleteBeer(beer, user);

  return (
    <Card px="0">
      <div className="flex justify-between px-6">
        <div className="flex items-center">
          <Avatar />

          <div className="flex flex-col">
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
          <Dropdown>
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
                    <div className="flex flex-col">
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
                        onClick={() => del()}
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
