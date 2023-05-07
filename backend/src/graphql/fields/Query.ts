import User from "../../entities/User";
import { parseGlobalID } from "../utils/id";

export default {
  users: async () => User.find(),

  user: async (source: any, args: { id: string }) => {
    const [id] = parseGlobalID(args.id);
    if (!id) {
      return null;
    }
    return User.findOne({ where: { id } });
  },
};
