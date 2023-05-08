/// <reference types="../../@types/global" />

import { getSession } from "../../neo4j/connection";

interface ConnectUserInput {
  id1: number;
  id2: number;
}

interface ConnectUserPayload {
  result: boolean;
}

export default async function connectUser(
  source: unknown,
  args: MutationInput<ConnectUserInput>,
  context: any
): Promise<ConnectUserPayload> {
  const input = args.input;

  const session = getSession(context);
  await session.executeWrite((txc) =>
    txc.run(
      `
      MATCH (user1:USER {id: $id1})
      MATCH (user2:USER {id: $id2})
      MERGE (user1)-[r:FRIEND]-(user2)
      `,
      input
    )
  );

  return {
    result: true,
  };
}
