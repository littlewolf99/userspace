import "reflect-metadata";
import config from "./config";
import { DataSource } from "typeorm";
import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import schema from "./graphql";
import User from "./entities/User";
import Post from "./entities/Post";
import { createContext } from "./auth";

async function main() {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: config.pgHost,
    port: config.pgPort,
    username: config.pgUsername,
    password: config.pgPassword,
    database: config.pgDatabase,
    entities: [User, Post],
    synchronize: true,
  });

  await AppDataSource.initialize();

  console.log("Connection to DB established");

  const yoga = createYoga({
    schema,
    context: createContext,
    graphiql: {
      subscriptionsProtocol: "WS",
    },
  });
  const server = createServer(yoga);
  const wsServer = new WebSocketServer({
    server: server,
    path: yoga.graphqlEndpoint,
  });

  useServer(
    {
      execute: (args: any) => args.rootValue.execute(args),
      subscribe: (args: any) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yoga.getEnveloped({
            ...ctx,
            req: ctx.extra.request,
            socket: ctx.extra.socket,
            params: msg.payload,
          });

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };

        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    wsServer
  );

  server.listen(config.port, () => {
    console.info("Server is running on port", config.port);
  });
}

main().catch((err) => {
  console.log(err);
  process.exit(-1);
});
