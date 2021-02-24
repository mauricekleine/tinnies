import { gql, useMutation, useQuery } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikHelpers } from "formik";
import { useRef } from "react";
import * as yup from "yup";

import CollectionCard from "../../components/CollectionCard";
import Page from "../../components/Page";
import CollectionsBlankSlate from "../../components/blank-slates/CollectionsBlankSlate";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Modal from "../../components/ui/Modal";
import {
  Form,
  Formik,
  InputField,
  MultiSelectField,
} from "../../components/ui/forms";
import { Heading, Lead } from "../../components/ui/typography";
import { useOpenHandler } from "../../components/ui/utils";
import {
  Beer,
  Collection,
  Mutation,
  MutationCreateCollectionArgs,
} from "../../types/graphql";
import { sortByProperty } from "../../utils/sort";

import { MY_BEERS } from "./beers";

const CREATE_COLLECTION = gql`
  mutation createCollection($beerIds: [ID!]!, $name: String!) {
    createCollection(beerIds: $beerIds, name: $name) {
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

export const MY_COLLECTIONS = gql`
  query getMyCollections {
    myCollections {
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

const NewCollectionSchema = yup.object().shape({
  name: yup.string().min(2, "Too Short!").required("Required"),
});

const initialValues: MutationCreateCollectionArgs = {
  beerIds: [],
  name: "",
};

const MyCollections = () => {
  const [createMyCollection] = useMutation<
    { createCollection: Mutation["createCollection"] },
    MutationCreateCollectionArgs
  >(CREATE_COLLECTION);

  const { data: myBeersData } = useQuery<{
    myBeers: Beer[];
  }>(MY_BEERS);

  const { data, loading } = useQuery<{
    myCollections: Collection[];
  }>(MY_COLLECTIONS);

  const modalRef = useRef();
  const { handleToggle, isOpen } = useOpenHandler(modalRef);

  const hasCollections = data && data.myCollections.length > 0;
  const myBeers = myBeersData ? myBeersData.myBeers : [];
  const showEmptyState = !loading && !hasCollections;
  const sortedBeers = sortByProperty(myBeers, "name");

  const handleSubmit = async (
    values: MutationCreateCollectionArgs,
    { setSubmitting }: FormikHelpers<MutationCreateCollectionArgs>
  ) => {
    setSubmitting(true);

    await createMyCollection({
      update: (cache, { data: { createCollection } }) => {
        const { myCollections } = cache.readQuery<{
          myCollections: Collection[];
        }>({
          query: MY_COLLECTIONS,
        });

        cache.writeQuery({
          data: { myCollections: [createCollection, ...myCollections] },
          query: MY_COLLECTIONS,
        });
      },
      variables: values,
    });

    setSubmitting(false);

    handleToggle();
  };

  return (
    <Page title="My Collection">
      <div className="flex justify-between mb-4">
        <Lead>My Collections</Lead>

        <Button onClick={handleToggle}>
          <FontAwesomeIcon className="h-4 mr-2 w-4" icon={faPlus} />
          Add new collection
        </Button>
      </div>

      {hasCollections &&
        data.myCollections.map((collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}

      {showEmptyState && (
        <Card>
          <Heading>It is time to add your first collection!</Heading>
          <p className="mb-2">
            Click &quot;Add a collection&quot; to get started
          </p>

          <CollectionsBlankSlate />
        </Card>
      )}

      <Modal isOpen={isOpen} ref={modalRef}>
        <div className="flex flex-col text-center">
          <span className="mb-2">Create a new collection</span>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={NewCollectionSchema}
          >
            {({ isSubmitting, submitForm }) => (
              <Form>
                <InputField label="Name" name="name" type="text" />

                <MultiSelectField
                  label="Beers"
                  name="beerIds"
                  optionKey="id"
                  optionValue="name"
                  options={sortedBeers}
                />

                <Button
                  isLoading={isSubmitting}
                  onClick={submitForm}
                  type="button"
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </Page>
  );
};

export default MyCollections;
