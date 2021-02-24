import { gql, useQuery } from "@apollo/client";

import BeerCard from "../components/beer-card";
import BeerCardPlaceholder from "../components/beer-card-placeholder";
import BeersBlankSlate from "../components/blank-slates/beers-blank-slate";
import Page from "../components/page";
import Card from "../components/ui/card";
import { Heading } from "../components/ui/typography";
import { Beer } from "../types/graphql";

export const ALL_BEERS = gql`
  query getAllBeers {
    beers {
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

const Home = () => {
  const { data, loading } = useQuery<{ beers: Beer[] }>(ALL_BEERS);
  const hasBeers = data && data.beers.length > 0;
  const showEmptyState = !loading && !hasBeers;

  return (
    <Page title="Recent updates">
      {loading && (
        <>
          <BeerCardPlaceholder />
          <BeerCardPlaceholder />
        </>
      )}

      {hasBeers &&
        data.beers.map((beer) => <BeerCard beer={beer} key={beer.id} />)}

      {showEmptyState && (
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

export default Home;
