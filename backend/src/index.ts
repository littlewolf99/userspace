import "reflect-metadata";
import config from "./config";
import { DataSource } from "typeorm";
import { createServer } from "http";
import { createYoga } from "graphql-yoga";

import User from "./entities/User";
import schema from "./graphql";

async function main() {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: config.pgHost,
    port: config.pgPort,
    username: config.pgUsername,
    password: config.pgPassword,
    database: config.pgDatabase,
    entities: [User],
    synchronize: true,
  });

  await AppDataSource.initialize();

  console.log("Connection to DB established");

  const yoga = createYoga({ schema });
  const server = createServer(yoga);

  server.listen(config.port, () => {
    console.info("Server is running on port", config.port);
  });
}

main().catch((err) => {
  console.log(err);
  process.exit(-1);
});
