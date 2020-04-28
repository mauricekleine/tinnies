import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";

import { useBeers } from "../hooks/hooks";
import useFetch from "../hooks/useFetch";
import { BeerDocument } from "../models/beer";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "../utils/imageConfig";

import BeerRatingField from "./BeerRatingField";
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
  const router = useRouter();

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

      router.replace("/home");
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
            <BeerRatingField label="Rating" name="rating" />

            <Button disabled={isSubmitting} onClick={submitForm} type="submit">
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default NewBeerCard;
