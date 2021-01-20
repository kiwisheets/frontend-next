import gql from 'graphql-tag';

export default gql`
  query previewInvoice {
    previewInvoice(
      invoice: {
        number: 1
        clientID: "5xvqrzqOJ6"
        items: [
          {
            name: "Test Item"
            description: "Item description"
            unitCost: 5
            quantity: 1
          }
        ]
      }
    )
  }
`;
