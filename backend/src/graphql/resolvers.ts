import Category from "../entities/Category";

export default {
  Query: {
    categories: async () => {
      return Category.find();
    },
  },
};
