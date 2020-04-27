import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { BeerDocument } from "../models/beer";
import { useBeers } from "../utils/hooks";
import useFetch from "../utils/useFetch";

import { Button } from "./ui/Buttons";
import Card from "./ui/Card";
import FormField from "./ui/FormField";

const NewBeerSchema = Yup.object().shape({
  brewery: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  rating: Yup.number().required("Required"),
});

const NewBeerCard = () => {
  const { mutate } = useBeers();
  const { post } = useFetch<BeerDocument[]>("/api/beers");

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { json, status } = await post({
      body: JSON.stringify(values),
    });

    setSubmitting(false);

    if (status === 201) {
      mutate(json);
    } else {
      // $TODO: handle error
    }
  };

  return (
    <Card>
      <h2>Add new beer</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={NewBeerSchema}
      >
        {({ isSubmitting, submitForm }) => (
          <Form className="flex flex-col">
            <FormField label="Brewery" name="brewery" type="text" />
            <FormField label="Image" name="image" type="text" />
            <FormField label="Name" name="name" type="text" />
            <FormField label="Rating" name="rating" type="text" />

            <Button disabled={isSubmitting} onClick={submitForm} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default NewBeerCard;
