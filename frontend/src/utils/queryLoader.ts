import { PreloadedQuery } from "react-relay";
import { OperationType } from "relay-runtime";

type QueryReference = PreloadedQuery<OperationType>;

type QueryStore = {
  [key: string]: QueryReference;
};

const store: QueryStore = {};

const loader = (key: string, importLoader: () => Promise<any>) => {
  return async () => {
    const actualLoader: () => Promise<QueryReference> = await importLoader();

    if (store[key]) {
      store[key].dispose();
    }

    store[key] = await actualLoader();

    return store[key];
  };
};

export default loader;
