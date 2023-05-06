export const getGlobalID = (model: string, id: string | number) =>
  Buffer.from(`${model}--${id}`).toString("base64");

export const parseGlobalID = (gid: string): [number, string] => {
  const parsed = Buffer.from(gid, "base64").toString().split("--");
  return [parseInt(parsed[1]), parsed[0] || ""];
};

export const createIDGenerator = <T extends BaseNode>(model: string) => ({
  id(source: T) {
    return getGlobalID(model, source.id);
  },
});
