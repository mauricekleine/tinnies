import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";

import useFetch from "../hooks/useFetch";
import { BeerDocument } from "../models/beer";
import { BreweryDocument } from "../models/brewery";
import {
  READ_BEERS_RESOURCE,
  READ_BREWERIES_RESOURCE,
} from "../utils/endpoints";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "../utils/imageConfig";

import { Button } from "./ui/Buttons";
import Card from "./ui/Card";
import { Title } from "./ui/Typography";
import AutoSuggestField from "./ui/forms/AutoSuggestField";
import ImageField from "./ui/forms/ImageField";
import FormField from "./ui/forms/InputField";
import BeerRatingField from "./ui/forms/RatingField";

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
  const { post } = useFetch<BeerDocument[]>(READ_BEERS_RESOURCE);
  const { data: breweries = [] } = useFetch<BreweryDocument[]>(
    READ_BREWERIES_RESOURCE,
    { getOnInit: true }
  );
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

    const { status } = await post({
      body: { ...values, image: imageId },
    });

    if (status === 201) {
      router.replace("/home");
    } else {
      // $TODO handle errors
      setSubmitting(false);
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
            <AutoSuggestField
              getOptionKey={(brewery: BreweryDocument) => brewery._id}
              getOptionValue={(brewery: BreweryDocument) => brewery.name}
              label="Brewery"
              name="brewery"
              options={breweries}
            />
            <ImageField label="Image" name="image" />
            <FormField label="Name" name="name" type="text" />
            <BeerRatingField label="Rating" name="rating" />

            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={submitForm}
              type="submit"
            >
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default NewBeerCard;
