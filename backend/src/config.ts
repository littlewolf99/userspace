import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 8000,
  pgHost: process.env.PG_HOST || "localhost",
  pgPort: Number(process.env.PG_PORT) || 5432,
  pgUsername: process.env.PG_USERNAME,
  pgPassword: process.env.PG_PASSWORD,
  pgDatabase: process.env.PG_DATABASE,
  neo4jDatabaseUrl: process.env.NEO4J_DATABASE_URL || "bolt://localhost:7687",
  neo4jUsername: process.env.NEO4J_USERNAME,
  neo4jPassword: process.env.NEO4J_PASSWORD,
};

export default config;
