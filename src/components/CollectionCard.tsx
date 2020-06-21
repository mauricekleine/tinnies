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
import Modal, { useModal } from "./ui/modals";

type Props = {
  collection: Collection;
};

const CollectionCard = ({ collection }: Props) => {
  const dropdownRef = useRef();
  const modalRef = useRef();

  const { dropdownProps, handleToggle: handleDropdownToggle } = useDropdown(
    dropdownRef,
    {
      width: "24",
    }
  );
  const { handleToggle: handleModalToggle, isOpen: isModalOpen } = useModal(
    modalRef
  );

  const { del } = useFetch<Collection[]>(COLLECTIONS_RESOURCE, {
    cacheKey: MY_COLLECTIONS_RESOURCE,
  });
  const { data: user } = useFetch<User>(CURRENT_USER_RESOURCE);

  const canDelete = canDeleteCollection(collection, user);

  const handleDelete = () => {
    del(collection._id);
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
              <Button isTransparent onClick={handleDropdownToggle}>
                <Icon icon={faEllipsisV} />
              </Button>
            </div>

            <Dropdown {...dropdownProps}>
              <div className="flex justify-center px-4 py-2">
                <Button
                  isTransparent
                  onClick={() => {
                    handleDropdownToggle();
                    handleModalToggle();
                  }}
                >
                  Delete
                </Button>
              </div>
            </Dropdown>

            <Modal isOpen={isModalOpen} ref={modalRef}>
              <div className="flex flex-col text-center">
                <span className="mb-2">Are you sure?</span>

                <div className="flex flex-row justify-between">
                  <Button isTransparent onClick={handleModalToggle}>
                    No
                  </Button>

                  <Button onClick={handleDelete}>Yes</Button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CollectionCard;
