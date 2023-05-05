export default /* GraphQL */ `
  interface Node {
    id: ID!
  }

  type User implements Node {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    friends: [User]
  }

  input CreateUserInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  input ConnectUserInput {
    id1: Int!
    id2: Int!
  }

  type ConnectUserPayload {
    result: Boolean!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    connectUser(input: ConnectUserInput): ConnectUserPayload
  }
`;
