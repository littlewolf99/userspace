export const generateCursor = (
  field: string,
  object: { [key: string]: any }
): string => {
  const fieldValue =
    object[field].constructor === Date
      ? object[field].toISOString()
      : object[field];

  return Buffer.from(`${field}--${fieldValue}`).toString("base64");
};

export const parseCursor = (cursor: string): [string, string | number] => {
  const tokens = Buffer.from(cursor, "base64").toString().split("--");
  const keyToken = tokens[1] || "0";
  const key = keyToken.match(/^[0-9\.]+$/) ? parseInt(keyToken) : keyToken;
  return [tokens[0], key];
};

export const createEdge = <T extends BaseNode>(
  node: T,
  field: string
): Edge<T> => ({
  node,
  cursor: generateCursor(field, node),
});

type FetcherFn<T> = (
  isForward: boolean,
  keyField: string,
  startKey: string | number,
  direction: "ASC" | "DESC",
  comp: string,
  limit: number
) => Promise<T[]>;

interface DoPaginateParams {
  args: PaginationParams;
  allowedKeyFields: string[];
  isAscendingForward?: boolean;
}

const doPaginate = async <T extends BaseNode>(
  config: DoPaginateParams,
  fetcherFn: FetcherFn<T>
) => {
  const { args, allowedKeyFields } = config;
  const isAscendingForward =
    typeof config.isAscendingForward === "undefined"
      ? true
      : config.isAscendingForward;
  const isForward = !!args.after || !args.before;
  let [keyField, startKey] = parseCursor(args.after || args.before || "");
  keyField =
    (keyField && allowedKeyFields.indexOf(keyField) >= 0 ? keyField : "") ||
    allowedKeyFields[0];

  const direction: "ASC" | "DESC" =
    isAscendingForward === isForward ? "ASC" : "DESC";
  const comp = isAscendingForward === isForward ? ">" : "<";
  const limit = Math.min(100, args.first);

  const data = await fetcherFn(
    isForward,
    keyField,
    startKey,
    direction,
    comp,
    limit + 1
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
  };
};

export default doPaginate;
