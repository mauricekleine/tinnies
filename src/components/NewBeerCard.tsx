import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

import { BeerDocument } from "../models/beer";
import { useBeers } from "../utils/hooks";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "../utils/imageConfig";
import useFetch from "../utils/useFetch";

import { Button } from "./ui/Buttons";
import Card from "./ui/Card";
import FormField, { ImageField } from "./ui/FormField";
import { Title } from "./ui/Typography";

const NewBeerSchema = yup.object().shape({
  brewery: yup.string().required("Required"),
  image: yup
    .mixed()
    .required("Required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= MAX_IMAGE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && ALLOWED_IMAGE_TYPES.includes(value.type)
    ),
  name: yup.string().required("Required"),
  rating: yup.number().required("Required"),
});

const NewBeerCard = () => {
  const { mutate } = useBeers();
  const { post } = useFetch<BeerDocument[]>("/api/beers");

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("file", values.image);
    formData.append("upload_preset", "ml_default");

    const cloudinaryResponse = await fetch(
      "https://api.cloudinary.com/v1_1/tinnies/upload",
      {
        body: formData,
        method: "POST",
      }
    );

    const { public_id: imageId } = await cloudinaryResponse.json();

    const { json, status } = await post({
      body: JSON.stringify({ ...values, image: imageId }),
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
      <Title>Add new beer</Title>

      <Formik
        initialValues={{ brewery: "", image: "", name: "", rating: "" }}
        onSubmit={onSubmit}
        validationSchema={NewBeerSchema}
      >
        {({ isSubmitting, submitForm }) => (
          <Form className="flex flex-col">
            <FormField label="Brewery" name="brewery" type="text" />
            <ImageField label="Image" name="image" />
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
