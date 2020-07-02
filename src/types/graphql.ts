import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../pages/api/graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  createBeer?: Maybe<Beer>;
  createCollection?: Maybe<Collection>;
  deleteBeer?: Maybe<Scalars['ID']>;
  deleteCollection?: Maybe<Array<Maybe<Collection>>>;
  login?: Maybe<LoginSignupResponse>;
  signup?: Maybe<LoginSignupResponse>;
};


export type MutationCreateBeerArgs = {
  brewery: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  rating: Scalars['Int'];
  styleId: Scalars['ID'];
};


export type MutationCreateCollectionArgs = {
  beerIds: Array<Scalars['ID']>;
  name: Scalars['String'];
};


export type MutationDeleteBeerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  beers?: Maybe<Array<Maybe<Beer>>>;
  beerStyles: Array<BeerStyle>;
  breweries?: Maybe<Array<Maybe<Brewery>>>;
  currentUser?: Maybe<User>;
  deleteCurrentUser?: Maybe<Scalars['ID']>;
  myCollections?: Maybe<Array<Maybe<Collection>>>;
  myBeers?: Maybe<Array<Maybe<Beer>>>;
};

export type Beer = {
  __typename?: 'Beer';
  addedBy: User;
  createdAt?: Maybe<Scalars['DateTime']>;
  brewery: Brewery;
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  rating: Scalars['Int'];
  style?: Maybe<BeerStyle>;
};

export type BeerStyle = {
  __typename?: 'BeerStyle';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Brewery = {
  __typename?: 'Brewery';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Collection = {
  __typename?: 'Collection';
  addedBy: User;
  beers: Array<Beer>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginSignupResponse = {
  __typename?: 'LoginSignupResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  Beer: ResolverTypeWrapper<Beer>;
  BeerStyle: ResolverTypeWrapper<BeerStyle>;
  Brewery: ResolverTypeWrapper<Brewery>;
  Collection: ResolverTypeWrapper<Collection>;
  LoginSignupResponse: ResolverTypeWrapper<LoginSignupResponse>;
  User: ResolverTypeWrapper<User>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars['DateTime'];
  Mutation: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  Query: {};
  Beer: Beer;
  BeerStyle: BeerStyle;
  Brewery: Brewery;
  Collection: Collection;
  LoginSignupResponse: LoginSignupResponse;
  User: User;
  Upload: Scalars['Upload'];
  Boolean: Scalars['Boolean'];
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBeer?: Resolver<Maybe<ResolversTypes['Beer']>, ParentType, ContextType, RequireFields<MutationCreateBeerArgs, 'brewery' | 'image' | 'name' | 'rating' | 'styleId'>>;
  createCollection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'beerIds' | 'name'>>;
  deleteBeer?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteBeerArgs, 'id'>>;
  deleteCollection?: Resolver<Maybe<Array<Maybe<ResolversTypes['Collection']>>>, ParentType, ContextType, RequireFields<MutationDeleteCollectionArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginSignupResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  signup?: Resolver<Maybe<ResolversTypes['LoginSignupResponse']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'name' | 'password'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  beers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Beer']>>>, ParentType, ContextType>;
  beerStyles?: Resolver<Array<ResolversTypes['BeerStyle']>, ParentType, ContextType>;
  breweries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Brewery']>>>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deleteCurrentUser?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  myCollections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Collection']>>>, ParentType, ContextType>;
  myBeers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Beer']>>>, ParentType, ContextType>;
};

export type BeerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Beer'] = ResolversParentTypes['Beer']> = {
  addedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  brewery?: Resolver<ResolversTypes['Brewery'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<Maybe<ResolversTypes['BeerStyle']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BeerStyleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BeerStyle'] = ResolversParentTypes['BeerStyle']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BreweryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Brewery'] = ResolversParentTypes['Brewery']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CollectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  addedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  beers?: Resolver<Array<ResolversTypes['Beer']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LoginSignupResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginSignupResponse'] = ResolversParentTypes['LoginSignupResponse']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = Context> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Beer?: BeerResolvers<ContextType>;
  BeerStyle?: BeerStyleResolvers<ContextType>;
  Brewery?: BreweryResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  LoginSignupResponse?: LoginSignupResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
