import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";

import Page from "../../components/Page";
import Card from "../../components/ui/Card";
import { Title } from "../../components/ui/Typography";
import { Button } from "../../components/ui/buttons";
import { ImageField, InputField, RatingField, SelectField } from "../../components/ui/forms";
import useFetch from "../../hooks/useFetch";
import { Beer } from "../../models/beer";
import { BeerStyle } from "../../models/beerStyle";
import { Brewery } from "../../models/brewery";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "../../utils/imageConfig";
import {
  BEER_STYLES_RESOURCE,
  BREWERIES_RESOURCE,
  MY_BEERS_RESOURCE,
} from "../../utils/resources";

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
  style: yup.string().required("Required"),
});

const NewBeer = () => {
  const { post } = useFetch<Beer[]>(MY_BEERS_RESOURCE);

  const { data: breweries = [] } = useFetch<Brewery[]>(BREWERIES_RESOURCE, {
    getOnInit: true,
  });

  const { data: beerStyles = [] } = useFetch<BeerStyle[]>(
    BEER_STYLES_RESOURCE,
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
      ...values,
      image: imageId,
    });

    if (status === 201) {
      router.replace("/home");
    } else {
      // $TODO handle errors
      setSubmitting(false);
    }
  };

  return (
    <Page title="Add new beer">
      <Card>
        <Title>Add new beer</Title>

        <Formik
          initialValues={{
            brewery: "",
            image: "",
            name: "",
            rating: "",
            style: "",
          }}
          onSubmit={onSubmit}
          validationSchema={NewBeerSchema}
        >
          {({ isSubmitting, submitForm }) => (
            <Form className="flex flex-col">
              <InputField label="Name" name="name" type="text" />

              <ImageField label="Image" name="image" />

              <SelectField
                creatable
                getOptionKey={(brewery: Brewery) => brewery._id}
                getOptionValue={(brewery: Brewery) => brewery.name}
                label="Brewery"
                name="brewery"
                options={breweries}
              />

              <SelectField
                getOptionKey={(style: BeerStyle) => style._id}
                getOptionValue={(style: BeerStyle) => style.name}
                label="Style"
                name="style"
                options={beerStyles}
              />

              <RatingField label="Rating" name="rating" />

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
    </Page>
  );
};

export default NewBeer;
