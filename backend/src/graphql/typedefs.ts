export default /* GraphQL */ `
  type Category {
    id: ID!
    name: String!
  }

  type Query {
    categories: [Category]
  }
`;
