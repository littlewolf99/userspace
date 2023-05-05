import User from "../../entities/User";

export default {
  users: async () => User.find(),

  user: async (source: any, args: any) =>
    User.findOne({ where: { id: args.id } }),
};
