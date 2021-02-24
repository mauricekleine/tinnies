import { gql, useMutation, useQuery } from "@apollo/client";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Image } from "cloudinary-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useRef } from "react";

import { MY_BEERS } from "../pages/beers";
import { Beer, Mutation, MutationDeleteBeerArgs, User } from "../types/graphql";
import { canDeleteBeer } from "../utils/permissions";

import Avatar from "./ui/avatar";
import Button from "./ui/button";
import Card from "./ui/card";
import Dropdown from "./ui/dropdown";
import Icon from "./ui/icon";
import Modal from "./ui/modal";
import Rating from "./ui/rating";
import Theme from "./ui/theme";
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

const BeerRow = ({ beer }: Props) => {
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
    <Theme>
      {({ bg }) => (
        <div
          className={classNames(
            bg.white,
            "flex justify-between mb-1 px-4 py-4 rounded-md"
          )}
        >
          <div className="space-y-1">
            <Rating value={beer.rating} />

            <Heading>{beer.name}</Heading>

            <p>
              {beer.style && <Muted>{beer.style.name}, </Muted>}
              <Muted>{beer.brewery.name}</Muted>
            </p>
          </div>

          {canDelete && (
            <>
              <div className="relative" ref={dropdownRef}>
                <Button isTransparent onClick={handleDropdownToggle}>
                  <Icon icon={faEllipsisV} />
                </Button>

                <Dropdown isOpen={isDropdownOpen} width="w-24">
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
      )}
    </Theme>
  );
};

export default BeerRow;
