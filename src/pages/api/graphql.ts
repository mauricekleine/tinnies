import { ApolloServer, gql } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { generateBeerModel } from "../../models/beer";
import { generateBeerStyleModel } from "../../models/beer-style";
import { generateBreweryModel } from "../../models/brewery";
import { generateCollectionsModel } from "../../models/collection";
import { generateUserModel } from "../../models/user";
import { Resolvers } from "../../types/graphql";
import { User } from "../../types/graphql";

mongoose.set("useCreateIndex", true);

const initializeDatabase = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

initializeDatabase();

export type Context = {
  models: {
    Beer: ReturnType<typeof generateBeerModel>;
    BeerStyle: ReturnType<typeof generateBeerStyleModel>;
    Brewery: ReturnType<typeof generateBreweryModel>;
    Collection: ReturnType<typeof generateCollectionsModel>;
    User: ReturnType<typeof generateUserModel>;
  };
};

const extractUserFromRequest = (request: MicroRequest) => {
  if (request.headers["authorization"]) {
    const matches = /(\S+)\s+(\S+)/.exec(request.headers["authorization"]);

    if (!matches) {
      return null;
    }

    const [_, scheme, token] = matches;

    if (scheme.toLowerCase() !== "bearer") {
      return null;
    }

    try {
      return jwt.verify(token, process.env.JWT_SECRET) as User;
    } catch {
      return null;
    }
  }

  return null;
};

const typeDefs = gql`
  ${DateTimeTypeDefinition}

  type Mutation {
    createBeer(
      brewery: String!
      image: String!
      name: String!
      rating: Int!
      styleId: ID!
    ): Beer
    createCollection(beerIds: [ID!]!, name: String!): Collection
    deleteBeer(id: ID!): ID
    deleteCollection(id: ID!): [Collection]
    login(email: String!, password: String!): LoginSignupResponse
    signup(
      email: String!
      name: String!
      password: String!
    ): LoginSignupResponse
  }

  type Query {
    beers: [Beer]
    beerStyles: [BeerStyle!]!
    breweries: [Brewery]
    currentUser: User
    deleteCurrentUser: ID
    myCollections: [Collection]
    myBeers: [Beer]
  }

  type Beer {
    addedBy: User!
    createdAt: DateTime
    brewery: Brewery!
    id: ID!
    image: String!
    name: String!
    rating: Int!
    style: BeerStyle
  }

  type BeerStyle {
    id: ID!
    name: String!
  }

  type Brewery {
    id: ID!
    name: String!
  }

  type Collection {
    addedBy: User!
    beers: [Beer!]!
    createdAt: DateTime
    id: ID!
    name: String!
  }

  type LoginSignupResponse {
    token: String
    user: User
  }

  type User {
    email: String!
    id: ID!
    name: String!
  }
`;

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    createBeer: (_, { brewery, image, name, rating, styleId }, ctx) =>
      ctx.models.Beer.createBeer(brewery, image, name, rating, styleId),
    createCollection: (_, { beerIds, name }, ctx) =>
      ctx.models.Collection.createCollection(beerIds, name),
    deleteBeer: (_, { id }, ctx) => ctx.models.Beer.deleteBeer(id),
    deleteCollection: (_, { id }, ctx) =>
      ctx.models.Collection.deleteCollection(id),
    login: (_, { email, password }, ctx) =>
      ctx.models.User.login(email, password),
    signup: (_, { email, name, password }, ctx) =>
      ctx.models.User.signup(email, name, password),
  },
  Query: {
    beerStyles: (_, args, ctx) => ctx.models.BeerStyle.getAll(),
    beers: (_, args, ctx) => ctx.models.Beer.getAll(),
    breweries: (_, args, ctx) => ctx.models.Brewery.getAll(),
    currentUser: (_, args, ctx) => ctx.models.User.getCurrentUser(),
    deleteCurrentUser: (_, args, ctx) => ctx.models.User.deleteCurrentUser(),
    myBeers: (_, args, ctx) => ctx.models.Beer.getAllForUser(),
    myCollections: (_, args, ctx) => ctx.models.Collection.getAllForUser(),
  },
};

const apolloServer = new ApolloServer({
  context: ({ req }: { req: MicroRequest }) => {
    const user = extractUserFromRequest(req);

    return {
      models: {
        Beer: generateBeerModel({ user }),
        BeerStyle: generateBeerStyleModel({ user }),
        Brewery: generateBreweryModel({ user }),
        Collection: generateCollectionsModel({ user }),
        User: generateUserModel({ user }),
      },
      user,
    };
  },
  resolvers,
  typeDefs,
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
