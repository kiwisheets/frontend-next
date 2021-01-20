import gql from 'graphql-tag';

export default gql`
  mutation createClient($client: CreateClientInput!) {
    createClient(client: $client) {
      id
    }
  }
`;
