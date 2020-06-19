import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useRef } from "react";

import { Beer } from "../models/beer";
import { User } from "../models/user";
import { canDeleteBeer } from "../utils/permissions";
import { BEERS_RESOURCE, CURRENT_USER_RESOURCE } from "../utils/resources";
import useFetch from "../utils/useFetch";

import Avatar from "./ui/Avatar";
import Card from "./ui/Card";
import { Icon } from "./ui/Icon";
import Rating from "./ui/Rating";
import Button from "./ui/buttons";
import Dropdown, { useDropdown } from "./ui/dropdowns";
import Modal, { useModal } from "./ui/modals";
import { Bold, FinePrint, Heading, Muted } from "./ui/typography";

type Props = {
  beer: Beer;
};

const BeerCard = ({ beer }: Props) => {
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

  const { del } = useFetch<Beer[]>(BEERS_RESOURCE);
  const { data: user } = useFetch<User>(CURRENT_USER_RESOURCE);

  const canDelete = canDeleteBeer(beer, user);

  const handleDelete = () => {
    del(beer._id);
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
              <Bold>{beer.addedBy.name}</Bold>

              <span> rated a beer</span>
            </p>

            <FinePrint>
              {formatDistanceToNow(new Date(beer.createdAt))} ago
            </FinePrint>
          </div>
        </div>

        {canDelete && (
          <>
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
            </div>

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
          </>
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

        <Heading>{beer.name}</Heading>

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
