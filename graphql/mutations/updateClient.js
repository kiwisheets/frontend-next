import gql from 'graphql-tag';

export default gql`
  mutation updateClient($id: ID!, $client: UpdateClientInput!) {
    updateClient(id: $id, client: $client) {
      id
    }
  }
`;
