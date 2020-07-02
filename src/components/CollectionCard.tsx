/** @jsx createElement */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { gql } from "apollo-boost";
import { createElement, useRef } from "react";

import { MY_COLLECTIONS } from "../pages/my/collections";
import {
  Collection,
  Mutation,
  MutationDeleteCollectionArgs,
  User,
} from "../types/graphql";
import { canDeleteCollection } from "../utils/permissions";

import Button from "./ui/Button";
import Card from "./ui/Card";
import Dropdown from "./ui/Dropdown";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";
import { useOpenHandler } from "./ui/utils";

const DELETE_COLLECTION = gql`
  mutation deleteCollection($id: ID!) {
    deleteCollection(id: $id) {
      addedBy {
        id
        name
      }
      beers {
        name
      }
      id
      name
    }
  }
`;

const USER = gql`
  query getCollectionUser {
    currentUser {
      id
    }
  }
`;

type Props = {
  collection: Collection;
};

const CollectionCard = ({ collection }: Props) => {
  const { data } = useQuery<{ currentUser: User }>(USER);

  const [deleteMyCollection] = useMutation<
    { deleteCollection: Mutation["deleteCollection"] },
    MutationDeleteCollectionArgs
  >(DELETE_COLLECTION);

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

  const canDelete = canDeleteCollection(collection, data && data.currentUser);

  const handleDelete = () => {
    deleteMyCollection({
      refetchQueries: [{ query: MY_COLLECTIONS }],
      variables: { id: collection.id },
    });

    handleModalClose();
  };

  const beerNames = collection.beers.map((beer) => beer.name);

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
