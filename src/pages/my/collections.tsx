import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import CollectionCard from "../../components/CollectionCard";
import Page from "../../components/Page";
import CollectionsBlankSlate from "../../components/blank-slates/CollectionsBlankSlate";
import Button from "../../components/ui/buttons";
import { Lead } from "../../components/ui/typography";
import { Collection } from "../../models/collection";
import { MY_COLLECTIONS_RESOURCE } from "../../utils/resources";
import useFetch from "../../utils/useFetch";

const MyCollections = () => {
  const { data: collections = [], post } = useFetch<Collection[]>(
    MY_COLLECTIONS_RESOURCE,
    {
      getOnInit: true,
    }
  );

  const hasCollections = collections.length > 0;

  const addNewCollection = async () => {
    const name = window.prompt("Collection name");

    if (name) {
      try {
        await post({
          name,
        });
      } catch (e) {
        // $TODO: handle error
      }
    }
  };

  return (
    <Page title="My Collection">
      <div className="flex justify-between mb-4">
        <Lead>My Collections</Lead>

        <Button onClick={addNewCollection}>
          <FontAwesomeIcon className="h-4 mr-2 w-4" icon={faPlus} />
          Add new collection
        </Button>
      </div>

      {hasCollections ? (
        collections.map((collection) => (
          <CollectionCard collection={collection} key={collection._id} />
        ))
      ) : (
        <CollectionsBlankSlate />
      )}
    </Page>
  );
};

export default MyCollections;
