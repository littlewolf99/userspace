import "reflect-metadata";
import config from "./config";
import { DataSource } from "typeorm";
import { createServer } from "http";
import { createYoga } from "graphql-yoga";

import Category from "./entities/Category";
import schema from "./graphql";

async function main() {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: config.pgHost,
    port: config.pgPort,
    username: config.pgUsername,
    password: config.pgPassword,
    database: config.pgDatabase,
    entities: [Category],
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
