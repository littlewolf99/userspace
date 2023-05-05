import User from "../../entities/User";

export default {
  users: async () => User.find(),
};
