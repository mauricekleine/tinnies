import { gql, useQuery } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BeerCard from "../components/beer-card";
import BeerCardPlaceholder from "../components/beer-card-placeholder";
import BeerRow from "../components/beer-row";
import BeersBlankSlate from "../components/blank-slates/beers-blank-slate";
import Page from "../components/page";
import Card from "../components/ui/card";
import NavbarLink from "../components/ui/navbar/navbar-link";
import { Heading, Lead } from "../components/ui/typography";
import { Beer } from "../types/graphql";

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
  const hasBeers = !loading && data?.myBeers?.length > 0;
  const showEmptyState = !loading && !hasBeers;

  return (
    <Page title="My Beers">
      <div className="flex justify-between mb-4">
        <Lead>My Beers</Lead>

        <NavbarLink href="/new/beer">
          <FontAwesomeIcon className="h-4 mr-2 w-4" icon={faPlus} />
          Add new beer
        </NavbarLink>
      </div>

      {loading && (
        <>
          <BeerCardPlaceholder />
          <BeerCardPlaceholder />
        </>
      )}

      {hasBeers &&
        data.myBeers.map((beer) => <BeerRow beer={beer} key={beer.id} />)}

      {showEmptyState && (
        <Card>
          <Heading>It is time to add your first beer!</Heading>
          <p className="mb-2">Click &quot;Add a beer&quot; to get started</p>

          <BeersBlankSlate />
        </Card>
      )}
    </Page>
  );
};

export default MyBeers;
