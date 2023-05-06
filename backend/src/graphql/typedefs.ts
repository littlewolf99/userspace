export default /* GraphQL */ `
  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type User implements Node {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    friends(first: Int!, before: String, after: String): UserConnection!
  }

  type UserEdge {
    node: User
    cursor: String!
  }

  type UserConnection {
    pageInfo: PageInfo!
    edges: [UserEdge]!
  }

  input CreateUserInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  input ConnectUserInput {
    id1: Int!
    id2: Int!
  }

  type SignInPayload {
    user: User!
    token: String!
  }

  type ConnectUserPayload {
    result: Boolean!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    signIn(input: SignInInput): SignInPayload
    connectUser(input: ConnectUserInput): ConnectUserPayload
  }
`;
