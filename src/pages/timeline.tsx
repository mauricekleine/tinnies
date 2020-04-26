import { ErrorMessage, Field, Form, Formik } from "formik";
import Head from "next/head";
import React from "react";
import * as Yup from "yup";

import BeerCard from "../components/BeerCard";
import { BeerDocument } from "../models/beer";
import { useAuthentication, useBeers } from "../utils/hooks";
import useFetch from "../utils/useFetch";

const NewBeerSchema = Yup.object().shape({
  brewery: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  rating: Yup.number().required("Required"),
});

const Timeline = () => {
  useAuthentication();

  const { beers, mutate } = useBeers();
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
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={NewBeerSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="brewery" />
              <ErrorMessage name="brewery" component="div" />

              <Field type="text" name="image" />
              <ErrorMessage name="image" component="div" />

              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />

              <Field type="text" name="rating" />
              <ErrorMessage name="rating" component="div" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex">
          {beers.map((beer) => (
            <BeerCard beer={beer} key={beer._id} />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Timeline;
