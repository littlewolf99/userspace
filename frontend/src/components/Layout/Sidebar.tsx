import * as React from "react";
import { PreloadedQuery, graphql, usePreloadedQuery } from "react-relay";
import { Space } from "antd";
import { useAuth } from "utils/auth";
import UserInfo from "./UserInfo";
import Friends from "../Friends";
import FriendSuggestions from "../Friends/FriendSuggestions";
import { SidebarQuery } from "__generated__/SidebarQuery.graphql";

export const sidebarQuery = graphql`
  query SidebarQuery {
    currentUser {
      ...UserInfoFragment
      ...FriendsFragment
      ...FriendSuggestionsFragment
    }
  }
`;

interface SidebarProps {
  queryRef: PreloadedQuery<SidebarQuery>;
}

const Sidebar: React.FC<SidebarProps> = ({ queryRef }) => {
  useAuth();
  const data = usePreloadedQuery(sidebarQuery, queryRef);

  return (
    <Space size={15} direction="vertical" style={{ width: "100%" }}>
      <UserInfo user={data.currentUser} />
      <Friends user={data.currentUser} />
      <FriendSuggestions user={data.currentUser} />
    </Space>
  );
};

export default Sidebar;
