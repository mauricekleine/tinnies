import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import * as yup from "yup";

import CollectionCard from "../../components/CollectionCard";
import Page from "../../components/Page";
import CollectionsBlankSlate from "../../components/blank-slates/CollectionsBlankSlate";
import Button from "../../components/ui/buttons";
import { Form, Formik, InputField } from "../../components/ui/forms";
import Modal, { useModal } from "../../components/ui/modals";
import { Lead } from "../../components/ui/typography";
import { Collection } from "../../models/collection";
import { MY_COLLECTIONS_RESOURCE } from "../../utils/resources";
import useFetch from "../../utils/useFetch";

const NewCollectionSchema = yup.object().shape({
  name: yup.string().min(2, "Too Short!").required("Required"),
});

const MyCollections = () => {
  const modalRef = useRef();
  const { handleToggle: handleModalToggle, isOpen: isModalOpen } = useModal(
    modalRef
  );

  const { data: collections = [], post } = useFetch<Collection[]>(
    MY_COLLECTIONS_RESOURCE,
    {
      getOnInit: true,
    }
  );

  const hasCollections = collections.length > 0;

  const onSubmit = async (values, { setSubmitting }) => {
    handleModalToggle();
    setSubmitting(true);

    try {
      await post(values);
    } catch (e) {
      // $TODO: handle error
      setSubmitting(false);
    }
  };

  return (
    <Page title="My Collection">
      <div className="flex justify-between mb-4">
        <Lead>My Collections</Lead>

        <Button onClick={handleModalToggle}>
          <FontAwesomeIcon className="h-4 mr-2 w-4" icon={faPlus} />
          Add new collection
        </Button>
      </div>

      <Modal isOpen={isModalOpen} ref={modalRef}>
        <div className="flex flex-col text-center">
          <span className="mb-2">Create a new collection</span>

          <Formik
            initialValues={{ name: "" }}
            onSubmit={onSubmit}
            validationSchema={NewCollectionSchema}
          >
            {({ isSubmitting, submitForm }) => (
              <Form>
                <InputField label="Name" name="name" type="text" />

                <Button isLoading={isSubmitting} onClick={submitForm}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

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
