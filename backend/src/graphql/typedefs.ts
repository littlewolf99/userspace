export default /* GraphQL */ `
  interface Node {
    id: ID!
  }

  type Category implements Node {
    id: ID!
    name: String!
  }

  type Query {
    categories: [Category]
  }
`;
