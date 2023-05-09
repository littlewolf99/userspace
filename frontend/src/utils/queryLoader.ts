import { PreloadedQuery } from "react-relay";
import { OperationType } from "relay-runtime";

type QueryReference = PreloadedQuery<OperationType>;

type QueryStore = {
  [key: string]: QueryReference;
};

type LoaderModule = {
  default: () => Promise<QueryReference>;
};

const store: QueryStore = {};

const loader = (key: string, importLoader: () => Promise<any>) => {
  return async () => {
    const loaderModule: LoaderModule = await importLoader();
    const actualLoader = loaderModule.default;

    if (store[key]) {
      store[key].dispose();
    }

    store[key] = await actualLoader();

    return store[key];
  };
};

export default loader;
