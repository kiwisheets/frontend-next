import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Int64: any;
  Time: any;
};












export type Address = {
  __typename?: 'Address';
  name: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  postalCode: Scalars['Int'];
  country: Scalars['String'];
};

export type AuthData = {
  __typename?: 'AuthData';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
  twoFactorEnabled: Scalars['Boolean'];
};

export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  name: Scalars['String'];
  website?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  businessNumber?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  shippingAddress: Address;
  billingAddress: Address;
  contacts?: Maybe<Array<Contact>>;
  createdAt: Scalars['Time'];
  invoices?: Maybe<Array<Invoice>>;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  users: Array<User>;
  domains: Array<Scalars['String']>;
  website: Scalars['String'];
  billingAddress: Address;
  shippingAddress: Address;
  createdAt: Scalars['Time'];
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  preferredContact?: Maybe<PreferredContact>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  createdAt: Scalars['Time'];
};

export type CreateAddressInput = {
  name: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  postalCode: Scalars['Int'];
  country: Scalars['String'];
};

export type CreateClientInput = {
  name: Scalars['String'];
  website?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  businessNumber?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  billingAddress: CreateAddressInput;
  shippingAddress: CreateAddressInput;
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  code: Scalars['String'];
  domains: Array<Scalars['String']>;
  website: Scalars['String'];
  billingAddress: CreateAddressInput;
  shippingAddress: CreateAddressInput;
};


export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['ID'];
  number: Scalars['Int64'];
  createdBy: User;
  client: Client;
  items: Array<LineItem>;
};

export type InvoiceInput = {
  clientID: Scalars['ID'];
  items: Array<LineItemInput>;
};

export type LineItem = {
  __typename?: 'LineItem';
  name: Scalars['String'];
  description: Scalars['String'];
  unitCost: Scalars['Float'];
  taxRate?: Maybe<Scalars['Float']>;
  quantity: Scalars['Float'];
};

export type LineItemInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  unitCost: Scalars['Float'];
  taxRate?: Maybe<Scalars['Float']>;
  quantity: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvoice: Invoice;
  updateInvoice: Invoice;
  createInvoicePdf: Scalars['String'];
  login: AuthData;
  loginSecure: Scalars['String'];
  refreshToken: Scalars['String'];
  changePassword: Scalars['Boolean'];
  newTwoFactorBackups: Array<Scalars['String']>;
  enableTwoFactor: Array<Scalars['String']>;
  disableTwoFactor: Scalars['Boolean'];
  createCompany?: Maybe<Company>;
  deleteCompany?: Maybe<Scalars['Boolean']>;
  createUser?: Maybe<User>;
  createUserForCompany?: Maybe<User>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  deleteUserForCompany?: Maybe<Scalars['Boolean']>;
  deleteUsers?: Maybe<Array<Scalars['Boolean']>>;
  deleteUsersForCompany?: Maybe<Array<Scalars['Boolean']>>;
  createClient?: Maybe<Client>;
  updateClient?: Maybe<Client>;
  deleteClient?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateInvoiceArgs = {
  invoice: InvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  invoice: InvoiceInput;
};


export type MutationCreateInvoicePdfArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  twoFactor?: Maybe<Scalars['String']>;
};


export type MutationLoginSecureArgs = {
  password: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationEnableTwoFactorArgs = {
  secret: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDisableTwoFactorArgs = {
  password: Scalars['String'];
};


export type MutationCreateCompanyArgs = {
  company: CreateCompanyInput;
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserForCompanyArgs = {
  companyID: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserForCompanyArgs = {
  companyID: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationDeleteUsersArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteUsersForCompanyArgs = {
  companyID: Scalars['ID'];
  ids: Array<Scalars['ID']>;
};


export type MutationCreateClientArgs = {
  client: CreateClientInput;
};


export type MutationUpdateClientArgs = {
  id: Scalars['ID'];
  client: UpdateClientInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};

export type Permission = {
  __typename?: 'Permission';
  subject: Scalars['String'];
  operation: Scalars['String'];
};

export enum PreferredContact {
  Phone = 'PHONE',
  Mobile = 'MOBILE',
  Email = 'EMAIL'
}

export type PreviewInvoiceInput = {
  number: Scalars['Int64'];
  clientID: Scalars['ID'];
  items: Array<LineItemInput>;
};

export type Query = {
  __typename?: 'Query';
  client?: Maybe<Client>;
  clientCount: Scalars['Int'];
  clients?: Maybe<Array<Client>>;
  companies?: Maybe<Array<Company>>;
  company: Company;
  companyName?: Maybe<Scalars['String']>;
  invoice: Invoice;
  invoices: Array<Invoice>;
  isLoggedIn: Scalars['Boolean'];
  me?: Maybe<User>;
  otherCompany?: Maybe<Company>;
  previewInvoice: Scalars['String'];
  scopes?: Maybe<Array<Permission>>;
  searchUsers?: Maybe<Array<User>>;
  searchUsersForCompany?: Maybe<Array<User>>;
  twoFactorBackups: Array<Scalars['String']>;
  twoFactorEnabled: Scalars['Boolean'];
  user?: Maybe<User>;
  userForCompany?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersForCompany?: Maybe<Array<User>>;
  version: Scalars['String'];
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryClientsArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryCompaniesArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryCompanyNameArgs = {
  code: Scalars['String'];
};


export type QueryInvoiceArgs = {
  id: Scalars['ID'];
};


export type QueryInvoicesArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryOtherCompanyArgs = {
  id: Scalars['ID'];
};


export type QueryPreviewInvoiceArgs = {
  invoice: PreviewInvoiceInput;
};


export type QuerySearchUsersArgs = {
  search: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
};


export type QuerySearchUsersForCompanyArgs = {
  companyID: Scalars['ID'];
  search: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserForCompanyArgs = {
  companyID: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryUsersForCompanyArgs = {
  companyID: Scalars['ID'];
  page?: Maybe<Scalars['Int']>;
};


export type UpdateAddressInput = {
  name?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['Int']>;
  country?: Maybe<Scalars['String']>;
};

export type UpdateClientInput = {
  name?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  businessNumber?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  billingAddress?: Maybe<CreateAddressInput>;
  shippingAddress?: Maybe<CreateAddressInput>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  company: Company;
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  preferredContact?: Maybe<PreferredContact>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  createdAt: Scalars['Time'];
};

export type CreateClientMutationVariables = Exact<{
  client: CreateClientInput;
}>;


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createClient?: Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, 'id'>
  )> }
);

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['ID'];
  client: UpdateClientInput;
}>;


export type UpdateClientMutation = (
  { __typename?: 'Mutation' }
  & { updateClient?: Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, 'id'>
  )> }
);

export type ClientQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ClientQuery = (
  { __typename?: 'Query' }
  & { client?: Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'website' | 'vatNumber' | 'businessNumber' | 'phone' | 'createdAt'>
    & { billingAddress: (
      { __typename?: 'Address' }
      & Pick<Address, 'name' | 'street1' | 'street2' | 'state' | 'city' | 'postalCode' | 'country'>
    ), shippingAddress: (
      { __typename?: 'Address' }
      & Pick<Address, 'name' | 'street1' | 'street2' | 'state' | 'city' | 'postalCode' | 'country'>
    ), contacts?: Maybe<Array<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'id' | 'firstname' | 'lastname' | 'email' | 'mobile' | 'phone' | 'preferredContact'>
    )>> }
  )> }
);

export type ClientCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'clientCount'>
);

export type ClientsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
}>;


export type ClientsQuery = (
  { __typename?: 'Query' }
  & { clients?: Maybe<Array<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name'>
  )>> }
);

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isLoggedIn'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstname' | 'lastname'>
    & { company: (
      { __typename?: 'Company' }
      & Pick<Company, 'name' | 'code'>
    ) }
  )> }
);

export type PreviewInvoiceQueryVariables = Exact<{ [key: string]: never; }>;


export type PreviewInvoiceQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'previewInvoice'>
);


export const CreateClientDocument = gql`
    mutation CreateClient($client: CreateClientInput!) {
  createClient(client: $client) {
    id
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, baseOptions);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($id: ID!, $client: UpdateClientInput!) {
  updateClient(id: $id, client: $client) {
    id
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      client: // value for 'client'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, baseOptions);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const ClientDocument = gql`
    query Client($id: ID!) {
  client(id: $id) {
    id
    name
    website
    vatNumber
    businessNumber
    phone
    createdAt
    billingAddress {
      name
      street1
      street2
      state
      city
      postalCode
      country
    }
    shippingAddress {
      name
      street1
      street2
      state
      city
      postalCode
      country
    }
    contacts {
      id
      firstname
      lastname
      email
      mobile
      phone
      preferredContact
    }
  }
}
    `;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClientQuery(baseOptions: Apollo.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        return Apollo.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
      }
export function useClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          return Apollo.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = Apollo.QueryResult<ClientQuery, ClientQueryVariables>;
export const ClientCountDocument = gql`
    query ClientCount {
  clientCount
}
    `;

/**
 * __useClientCountQuery__
 *
 * To run a query within a React component, call `useClientCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientCountQuery(baseOptions?: Apollo.QueryHookOptions<ClientCountQuery, ClientCountQueryVariables>) {
        return Apollo.useQuery<ClientCountQuery, ClientCountQueryVariables>(ClientCountDocument, baseOptions);
      }
export function useClientCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientCountQuery, ClientCountQueryVariables>) {
          return Apollo.useLazyQuery<ClientCountQuery, ClientCountQueryVariables>(ClientCountDocument, baseOptions);
        }
export type ClientCountQueryHookResult = ReturnType<typeof useClientCountQuery>;
export type ClientCountLazyQueryHookResult = ReturnType<typeof useClientCountLazyQuery>;
export type ClientCountQueryResult = Apollo.QueryResult<ClientCountQuery, ClientCountQueryVariables>;
export const ClientsDocument = gql`
    query Clients($page: Int) {
  clients(page: $page) {
    id
    name
  }
}
    `;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, baseOptions);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, baseOptions);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const IsLoggedInDocument = gql`
    query IsLoggedIn {
  isLoggedIn @client
}
    `;

/**
 * __useIsLoggedInQuery__
 *
 * To run a query within a React component, call `useIsLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<IsLoggedInQuery, IsLoggedInQueryVariables>) {
        return Apollo.useQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(IsLoggedInDocument, baseOptions);
      }
export function useIsLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsLoggedInQuery, IsLoggedInQueryVariables>) {
          return Apollo.useLazyQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(IsLoggedInDocument, baseOptions);
        }
export type IsLoggedInQueryHookResult = ReturnType<typeof useIsLoggedInQuery>;
export type IsLoggedInLazyQueryHookResult = ReturnType<typeof useIsLoggedInLazyQuery>;
export type IsLoggedInQueryResult = Apollo.QueryResult<IsLoggedInQuery, IsLoggedInQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstname
    lastname
    company {
      name
      code
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PreviewInvoiceDocument = gql`
    query PreviewInvoice {
  previewInvoice(
    invoice: {number: 1, clientID: "5xvqrzqOJ6", items: [{name: "Test Item", description: "Item description", unitCost: 5, quantity: 1}]}
  )
}
    `;

/**
 * __usePreviewInvoiceQuery__
 *
 * To run a query within a React component, call `usePreviewInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewInvoiceQuery({
 *   variables: {
 *   },
 * });
 */
export function usePreviewInvoiceQuery(baseOptions?: Apollo.QueryHookOptions<PreviewInvoiceQuery, PreviewInvoiceQueryVariables>) {
        return Apollo.useQuery<PreviewInvoiceQuery, PreviewInvoiceQueryVariables>(PreviewInvoiceDocument, baseOptions);
      }
export function usePreviewInvoiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewInvoiceQuery, PreviewInvoiceQueryVariables>) {
          return Apollo.useLazyQuery<PreviewInvoiceQuery, PreviewInvoiceQueryVariables>(PreviewInvoiceDocument, baseOptions);
        }
export type PreviewInvoiceQueryHookResult = ReturnType<typeof usePreviewInvoiceQuery>;
export type PreviewInvoiceLazyQueryHookResult = ReturnType<typeof usePreviewInvoiceLazyQuery>;
export type PreviewInvoiceQueryResult = Apollo.QueryResult<PreviewInvoiceQuery, PreviewInvoiceQueryVariables>;