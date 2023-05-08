import * as React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Space } from "antd";
import { useAuth } from "utils/auth";
import UserInfo from "../UserInfo";
import Friends from "../Friends";
import FriendSuggestions from "../Friends/FriendSuggestions";
import { SidebarQuery } from "__generated__/SidebarQuery.graphql";

const userQuery = graphql`
  query SidebarQuery {
    currentUser {
      ...UserInfoFragment
      ...FriendsFragment
      ...FriendSuggestionsFragment
    }
  }
`;

const Sidebar: React.FC = () => {
  useAuth();
  const data = useLazyLoadQuery<SidebarQuery>(userQuery, {});

  return (
    <Space size={15} direction="vertical" style={{ width: "100%" }}>
      <UserInfo user={data.currentUser} />
      <Friends user={data.currentUser} />
      <FriendSuggestions user={data.currentUser} />
    </Space>
  );
};

export default Sidebar;
