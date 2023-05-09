import { JwtPayload, verify } from "jsonwebtoken";
import config from "./config";
import User from "./entities/User";
import { YogaInitialContext } from "graphql-yoga";

export async function authenticateUser(
  request?: Request
): Promise<User | null> {
  const header = request?.headers.get("authorization");
  if (header) {
    const token = header.split(" ")[1];
    const tokenPayload = verify(token, config.appSecret) as JwtPayload;
    const userId = tokenPayload.userId;
    return User.findOneBy({ id: userId });
  }

  return null;
}

export interface GraphQLContext {
  currentUser: User | null;
  request: Request;
}

export async function createContext(
  initialContext: YogaInitialContext
): Promise<GraphQLContext> {
  return {
    request: initialContext.request,
    currentUser: await authenticateUser(initialContext.request),
  };
}
