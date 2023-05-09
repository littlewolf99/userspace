# Userspace - a simple social app demo

A simple web app that demonstrates usage of `Relay` and `GraphQL`. Supported by back end that uses `PostgreSQL` to store main data and `Neo4j` for graph-like relations between models.

## Used technologies

- `React`: for front end UI
- `React Router v6`: Latest version of react-router that supports render-as-you-fetch pattern
- `Relay`: front end GraphQL library
- `antd`: UI framework
- `graphql-yoga`: GraphQL server framework
- `typeorm`: ORM to access data in Postgres database
- `neo4j-driver`: Official Node.js driver of Neo4j graph database
- `TypeScript` for both back and front ends: static typing makes your life easier in the long run

## Implementations:

- `render-as-you-fetch` pattern: check `routes/index.tsx` to see how data loading starts even before rendering route begins.
- `Real-time subscriptions`
- `Cursor-based paginations` per Relay's server spec
- `Code-splitting`. Note that for code-split routes, data loading begins simultaneously with split chunk asset loading.
- `Bundle analysis`: Run `npm run build`, then `npm run analyze` to see how your bundles are created.
