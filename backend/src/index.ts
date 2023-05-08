import "reflect-metadata";
import config from "./config";
import { DataSource } from "typeorm";
import { createServer } from "http";
import { createYoga } from "graphql-yoga";
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
  });
  const server = createServer(yoga);

  server.listen(config.port, () => {
    console.info("Server is running on port", config.port);
  });
}

main().catch((err) => {
  console.log(err);
  process.exit(-1);
});
