import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";

import useDropdown from "../hooks/useDropdown";
import useFetch from "../hooks/useFetch";
import { Collection } from "../models/collection";
import { User } from "../models/user";
import { canDeleteCollection } from "../utils/permissions";
import {
  COLLECTIONS_RESOURCE,
  MY_COLLECTIONS_RESOURCE,
  MY_PROFILE_RESOURCE,
} from "../utils/resources";

import Card from "./ui/Card";
import { Icon } from "./ui/Icon";
import Button from "./ui/buttons";

type Props = {
  collection: Collection;
};

const CollectionCard = ({ collection }: Props) => {
  const dropdownRef = useRef();
  const { dropdownProps, handleToggle, isOpen } = useDropdown(dropdownRef, {
    width: "24",
  });
  const { del } = useFetch<Collection[]>(COLLECTIONS_RESOURCE, {
    cacheKey: MY_COLLECTIONS_RESOURCE,
  });
  const { data: user } = useFetch<User>(MY_PROFILE_RESOURCE);

  const canDelete = canDeleteCollection(collection, user);

  const handleDelete = async () => {
    const result = confirm("Are you sure?");

    if (result) {
      del(collection._id);
    }
  };

  return (
    <Card px="6">
      <div className="flex flex-row justify-between">
        <div
          className="font-semibold text-xl"
          dangerouslySetInnerHTML={{ __html: collection.name }}
        />

        {canDelete && (
          <div className="relative" ref={dropdownRef}>
            <div className="cursor-pointer -mt-2 p-2" onClick={handleToggle}>
              <Icon icon={faEllipsisV} />
            </div>

            {isOpen && (
              <div {...dropdownProps}>
                <div className="px-4 py-2">
                  <Button isTransparent onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CollectionCard;
