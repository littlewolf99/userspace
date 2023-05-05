import { useAuth } from "utils/auth";
import * as React from "react";

const UserInfo: React.FC = () => {
  const [user] = useAuth(false);

  if (!user) {
    return null;
  }

  return <div>{user.username}</div>;
};

export default UserInfo;
