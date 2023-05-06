interface BaseNode {
  id: string | number;
}

interface MutationInput<T> {
  input: T;
}

interface PaginationParams {
  before?: string;
  after?: string;
  first: number;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface Connection<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
  totalCount: Number;
}

interface Edge<T> {
  node: T;
  cursor: string;
}

interface QueryVariables {
  [key: string]: string | number;
}
