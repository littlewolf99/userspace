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
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    signIn(input: SignInInput): SignInPayload
    connectUser(input: ConnectUserInput): ConnectUserPayload
  }
`;
