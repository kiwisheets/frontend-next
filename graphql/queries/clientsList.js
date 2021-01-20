import gql from 'graphql-tag';

export default gql`
  query clients($page: Int) {
    clients(page: $page) {
      id
      name
    }
  }
`;
