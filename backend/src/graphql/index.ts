import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});

export default schema;
