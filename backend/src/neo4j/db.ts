export const createWhere = (
  conditions: string[],
  op: string = " AND "
): string => {
  if (!conditions.length) {
    return "";
  }
  return `WHERE ${conditions.join(op)}`;
};
