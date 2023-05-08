/// <reference types="../../@types/global" />

import { getGlobalID } from "../utils/id";

interface Entity {
  id: number;
  name: string;
}

export default {
  id<T extends Entity>(source: T) {
    return getGlobalID(source.name, source.id);
  },

  __resolveType<T extends Entity>(source: T) {
    return source.constructor.name;
  },
};
