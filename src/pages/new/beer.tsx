import { gql, useMutation, useQuery } from "@apollo/client";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";

import Page from "../../components/page";
import Button from "../../components/ui/button";
import Card from "../../components/ui/card";
import {
  Form,
  Formik,
  ImageField,
  InputField,
  RatingField,
  SelectField,
} from "../../components/ui/forms";
import { Lead } from "../../components/ui/typography";
import {
  Beer,
  BeerStyle,
  Brewery,
  Mutation,
  MutationCreateBeerArgs,
} from "../../types/graphql";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "../../utils/image-config";
import { ALL_BEERS } from "../home";
import { MY_BEERS } from "../my/beers";

const CREATE_BEER = gql`
  mutation createBeer(
    $brewery: String!
    $image: String!
    $name: String!
    $rating: Int!
    $styleId: ID!
  ) {
    createBeer(
      brewery: $brewery
      image: $image
      name: $name
      rating: $rating
      styleId: $styleId
    ) {
      addedBy {
        id
        name
      }
      brewery {
        id
        name
      }
      createdAt
      id
      image
      name
      rating
      style {
        id
        name
      }
    }
  }
`;

const BREWERIES_AND_BEERSTYLES = gql`
  query getBreweriesAndBeerStyles {
    breweries {
      id
      name
    }
    beerStyles {
      id
      name
    }
  }
`;

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
  rating: yup.number().min(1).max(5).required("Required"),
  styleId: yup.string().required("Required"),
});

const NewBeer = () => {
  const [createMyBeer] = useMutation<
    { createBeer: Mutation["createBeer"] },
    MutationCreateBeerArgs
  >(CREATE_BEER);

  const { data } = useQuery<{
    beerStyles: BeerStyle[];
    breweries: Brewery[];
  }>(BREWERIES_AND_BEERSTYLES);

  const router = useRouter();

  const initialValues: MutationCreateBeerArgs = {
    brewery: "",
    image: "",
    name: "",
    rating: 0,
    styleId: "",
  };

  const onSubmit = async (
    values: MutationCreateBeerArgs,
    { setSubmitting }: FormikHelpers<MutationCreateBeerArgs>
  ) => {
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

    try {
      await createMyBeer({
        update: (cache, { data: { createBeer } }) => {
          try {
            const { beers } = cache.readQuery<{
              beers: Beer[];
            }>({
              query: ALL_BEERS,
            });

            cache.writeQuery({
              data: { beers: [createBeer, ...beers] },
              query: ALL_BEERS,
            });
          } catch {
            // https://github.com/apollographql/apollo-feature-requests/issues/1
          }

          try {
            const { myBeers } = cache.readQuery<{
              myBeers: Beer[];
            }>({
              query: MY_BEERS,
            });

            cache.writeQuery({
              data: { myBeers: [createBeer, ...myBeers] },
              query: MY_BEERS,
            });
          } catch {
            // https://github.com/apollographql/apollo-feature-requests/issues/1
          }
        },
        variables: {
          ...values,
          image: imageId,
        },
      });

      router.replace("/my/beers");
    } catch {
      // $TODO handle errors
      setSubmitting(false);
    }
  };

  return (
    <Page title="Add new beer">
      <Card>
        <Lead>Add new beer</Lead>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={NewBeerSchema}
        >
          {({ isSubmitting, submitForm }) => (
            <Form className="flex flex-col">
              <InputField label="Name" name="name" type="text" />

              <ImageField label="Image" name="image" />

              <SelectField
                creatable
                optionKey="id"
                optionValue="name"
                label="Brewery"
                name="brewery"
                options={data ? data.breweries : []}
              />

              <SelectField
                optionKey="id"
                optionValue="name"
                label="Style"
                name="styleId"
                options={data ? data.beerStyles : []}
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
