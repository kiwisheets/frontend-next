import gql from 'graphql-tag';

export default gql`
  query me {
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
