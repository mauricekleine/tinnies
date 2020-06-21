import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";

import { Beer } from "../models/beer";
import { Collection } from "../models/collection";
import { User } from "../models/user";
import { canDeleteCollection } from "../utils/permissions";
import {
  COLLECTIONS_RESOURCE,
  CURRENT_USER_RESOURCE,
  MY_COLLECTIONS_RESOURCE,
} from "../utils/resources";
import useFetch from "../utils/useFetch";

import Card from "./ui/Card";
import { Icon } from "./ui/Icon";
import Button from "./ui/buttons";
import Dropdown, { useDropdown } from "./ui/dropdowns";

type Props = {
  collection: Collection;
};

const CollectionCard = ({ collection }: Props) => {
  const dropdownRef = useRef();
  const { dropdownProps, handleToggle } = useDropdown(dropdownRef, {
    width: "24",
  });
  const { del } = useFetch<Collection[]>(COLLECTIONS_RESOURCE, {
    cacheKey: MY_COLLECTIONS_RESOURCE,
  });
  const { data: user } = useFetch<User>(CURRENT_USER_RESOURCE);

  const canDelete = canDeleteCollection(collection, user);

  const handleDelete = async () => {
    const result = confirm("Are you sure?");

    if (result) {
      del(collection._id);
    }
  };

  const beerNames = (collection.beers as Beer[]).map((beer) => beer.name);

  return (
    <Card px="6">
      <div className="flex flex-row justify-between">
        <div className="">
          <div
            className="font-semibold text-xl"
            dangerouslySetInnerHTML={{ __html: collection.name }}
          />

          <p>{beerNames.join(", ")}</p>
        </div>

        {canDelete && (
          <div className="relative" ref={dropdownRef}>
            <div className="-mt-2">
              <Button isTransparent onClick={handleToggle}>
                <Icon icon={faEllipsisV} />
              </Button>
            </div>

            <Dropdown {...dropdownProps}>
              <div className="flex justify-center px-4 py-2">
                <Button isTransparent onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </Dropdown>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CollectionCard;
