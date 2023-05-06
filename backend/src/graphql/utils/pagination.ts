const generateCursor = (
  field: string,
  object: { [key: string]: any }
): string => {
  return Buffer.from(`${field}--${object[field]}`).toString("base64");
};

const parseCursor = (cursor: string): [string, number] => {
  const tokens = Buffer.from(cursor, "base64").toString().split("--");
  return [tokens[0], parseInt(tokens[1] || "0")];
};

const createEdge = <T extends BaseNode>(node: T, field: string): Edge<T> => ({
  node,
  cursor: generateCursor(field, node),
});

type FetcherFn<T> = (
  isForward: boolean,
  keyField: string,
  startKey: string | number,
  direction: string,
  comp: string,
  limit: number
) => Promise<T[]>;

interface DoPaginateParams {
  args: PaginationParams;
  isAscendingForward?: boolean;
  defaultKeyField?: string;
}

const doPaginate = async <T extends BaseNode>(
  config: DoPaginateParams,
  fetcherFn: FetcherFn<T>
) => {
  const { args } = config;
  const isAscendingForward =
    typeof config.isAscendingForward === "undefined"
      ? true
      : config.isAscendingForward;
  const defaultKeyField = config.defaultKeyField || "id";
  const isForward = !!args.after || !args.before;
  let [keyField, startKey] = parseCursor(args.after || args.before || "");
  keyField = keyField || defaultKeyField;

  const direction = isAscendingForward === isForward ? "ASC" : "DESC";
  const comp = isAscendingForward === isForward ? ">" : "<";
  const limit = Math.min(100, args.first);

  const data = await fetcherFn(
    isForward,
    keyField,
    startKey,
    direction,
    comp,
    limit
  );

  const hasNextPage = data.length > limit;
  if (hasNextPage) {
    data.pop();
  }

  const pageInfo = {
    hasPreviousPage: true,
    hasNextPage,
    startCursor: data.length > 0 ? generateCursor(keyField, data[0]) : "",
    endCursor:
      data.length > 0 ? generateCursor(keyField, data[data.length - 1]) : "",
  };

  const edges = data.map((user) => createEdge(user, keyField));

  return {
    pageInfo,
    edges,
    totalCount: 0,
  };
};

export default doPaginate;
