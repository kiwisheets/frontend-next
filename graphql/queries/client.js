import gql from 'graphql-tag';

export default gql`
  query client($id: ID!) {
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
