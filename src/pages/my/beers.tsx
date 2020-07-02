/** @jsx createElement */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { createElement } from "react";

import BeerCard from "../../components/BeerCard";
import BeerCardPlaceholder from "../../components/BeerCardPlaceholder";
import Page from "../../components/Page";
import BeersBlankSlate from "../../components/blank-slates/BeersBlankSlate";
import Card from "../../components/ui/Card";
import { Heading } from "../../components/ui/typography";
import { Beer } from "../../types/graphql";

export const MY_BEERS = gql`
  query getMyBeers {
    myBeers {
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

const MyBeers = () => {
  const { data, loading } = useQuery<{ myBeers: Beer[] }>(MY_BEERS);
  const hasBeers = !loading && data && data.myBeers.length > 0;

  return (
    <Page title="My Beers">
      {loading && (
        <>
          <BeerCardPlaceholder />
          <BeerCardPlaceholder />
        </>
      )}

      {hasBeers ? (
        data.myBeers.map((beer) => <BeerCard beer={beer} key={beer.id} />)
      ) : (
        <Card>
          <Heading>It is time to add your first beer!</Heading>
          <p className="mb-2">
            Click &quot;Add a beer&quot; in the menu bar up top
          </p>

          <BeersBlankSlate />
        </Card>
      )}
    </Page>
  );
};

export default MyBeers;
