interface MutationInput<T> {
  input: T;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface Connection<T> {
  pageInfo: PageInfo;
  edges: T[];
  totalCount: Number;
}

interface Edge<T> {
  node: T;
  cursor: string;
}
