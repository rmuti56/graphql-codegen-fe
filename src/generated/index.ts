import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    ...({"headers":{"content-type":"application/json","Apollo-Require-Preflight":"true"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** cat */
export type Cat = {
  __typename?: 'Cat';
  creationDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  description2?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cats: Array<Cat>;
};

export type CatsQueryVariables = Exact<{ [key: string]: never; }>;


export type CatsQuery = { __typename?: 'Query', cats: Array<{ __typename?: 'Cat', id: string, name: string, description?: string | null }> };


export const CatsDocument = `
    query Cats {
  cats {
    id
    name
    description
  }
}
    `;
export const useCatsQuery = <
      TData = CatsQuery,
      TError = unknown
    >(
      variables?: CatsQueryVariables,
      options?: UseQueryOptions<CatsQuery, TError, TData>
    ) =>
    useQuery<CatsQuery, TError, TData>(
      variables === undefined ? ['Cats'] : ['Cats', variables],
      fetcher<CatsQuery, CatsQueryVariables>(CatsDocument, variables),
      options
    );