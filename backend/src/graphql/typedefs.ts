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
    friendSuggestions(
      first: Int!
      before: String
      after: String
    ): UserConnection!
    feed(first: Int!, before: String, after: String): PostConnection!
  }

  type UserEdge {
    node: User
    cursor: String!
  }

  type UserConnection {
    pageInfo: PageInfo!
    edges: [UserEdge]!
  }

  type Post {
    id: ID!
    content: String!
    postedAt: String!
    userId: String!
    user: User!
  }

  type PostEdge {
    node: Post
    cursor: String!
  }

  type PostConnection {
    pageInfo: PageInfo!
    edges: [PostEdge]!
  }

  input CreateUserInput {
    username: String!
    password: String!
    email: String!
    firstName: String!
    lastName: String!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  input ConnectUserInput {
    id1: Int!
    id2: Int!
  }

  input CreatePostInput {
    content: String!
  }

  type SignInPayload {
    user: User!
    token: String!
  }

  type ConnectUserPayload {
    result: Boolean!
  }

  type Query {
    node(id: ID!): Node
    users: [User]
    user(id: ID!): User
    currentUser: User
  }

  type Mutation {
    createUser(input: CreateUserInput): UserEdge
    signIn(input: SignInInput): SignInPayload
    connectUser(input: ConnectUserInput): ConnectUserPayload
    createPost(input: CreatePostInput): PostEdge
  }
`;
