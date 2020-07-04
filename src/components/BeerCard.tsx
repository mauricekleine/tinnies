/** @jsx createElement */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { gql } from "apollo-boost";
import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { createElement, useRef } from "react";

import { ALL_BEERS } from "../pages/home";
import { MY_BEERS } from "../pages/my/beers";
import { Beer, Mutation, MutationDeleteBeerArgs, User } from "../types/graphql";
import { canDeleteBeer } from "../utils/permissions";

import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Dropdown from "./ui/Dropdown";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";
import Rating from "./ui/Rating";
import { Bold, FinePrint, Heading, Muted } from "./ui/typography";
import { useOpenHandler } from "./ui/utils";

const DELETE_BEER = gql`
  mutation deleteBeer($id: ID!) {
    deleteBeer(id: $id)
  }
`;

const USER = gql`
  query getBeerUser {
    currentUser {
      id
    }
  }
`;

type Props = {
  beer: Beer;
};

const BeerCard = ({ beer }: Props) => {
  const { data } = useQuery<{ currentUser: User }>(USER);

  const [deleteMyBeer] = useMutation<
    { deleteBeer: Mutation["deleteBeer"] },
    MutationDeleteBeerArgs
  >(DELETE_BEER);

  const dropdownRef = useRef();
  const {
    handleToggle: handleDropdownToggle,
    isOpen: isDropdownOpen,
  } = useOpenHandler(dropdownRef);

  const modalRef = useRef();
  const {
    handleClose: handleModalClose,
    handleToggle: handleModalToggle,
    isOpen: isModalOpen,
  } = useOpenHandler(modalRef);

  const canDelete = canDeleteBeer(beer, data && data.currentUser);

  const handleDelete = () => {
    deleteMyBeer({
      update: (cache) => {
        try {
          const { beers } = cache.readQuery<{
            beers: Beer[];
          }>({
            query: ALL_BEERS,
          });

          cache.writeQuery({
            data: { beers: beers.filter(({ id }) => id !== beer.id) },
            query: ALL_BEERS,
          });
        } catch {
          // https://github.com/apollographql/apollo-feature-requests/issues/1
        }

        try {
          const { myBeers } = cache.readQuery<{
            myBeers: Beer[];
          }>({
            query: MY_BEERS,
          });

          cache.writeQuery({
            data: { myBeers: myBeers.filter(({ id }) => id !== beer.id) },
            query: MY_BEERS,
          });
        } catch {
          // https://github.com/apollographql/apollo-feature-requests/issues/1
        }
      },
      variables: { id: beer.id },
    });
    handleModalClose();
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
              <>{formatDistanceToNow(new Date(beer.createdAt))} ago</>
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

              <Dropdown isOpen={isDropdownOpen} width="24">
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
