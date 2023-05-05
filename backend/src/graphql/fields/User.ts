import { getSession } from "../../neo4j/connection";
import User from "../../entities/User";
import { QueryResult, Node } from "neo4j-driver";

interface UserData {
  id: number;
  username: string;
  email: string;
  fullName: string;
}

interface UserRecord {
  friend: Node<number, UserData>;
}

export default {
  friends: async (user: User, args: any, context: any) => {
    const session = getSession(context);
    const result = await session.executeRead<QueryResult<UserRecord>>((txc) =>
      txc.run(
        `
        MATCH (user:USER {id: $id})
        MATCH (user)-[:FRIEND]-(friend:USER)
        RETURN friend
        `,
        {
          id: user.id,
          username: user.username,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }
      )
    );
    session.close();

    return result.records.map((record) => record.get("friend").properties);
  },
};
