import neo4j, { Session } from "neo4j-driver";
import config from "../config";

export function getSession(context: any): Session {
  let driver = null;
  if (context.neo4jDriver) {
    driver = context.neo4jDriver;
  } else {
    driver = neo4j.driver(
      config.neo4jDatabaseUrl,
      neo4j.auth.basic(config.neo4jUsername, config.neo4jPassword)
    );
    context.neo4jDriver = driver;
  }

  return driver.session();
}
