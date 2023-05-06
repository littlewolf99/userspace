import * as React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Col, Layout, Menu, Row, Space } from "antd";
import UserInfo from "./UserInfo";
import Friends from "./Friends";
import { useAuth } from "utils/auth";
import { LayoutQuery } from "__generated__/LayoutQuery.graphql";
import FriendSuggestions from "./Friends/FriendSuggestions";

const { Header, Content } = Layout;

const userQuery = graphql`
  query LayoutQuery($id: ID!) {
    user(id: $id) {
      ...UserInfoFragment
      ...FriendsFragment
      ...FriendSuggestionsFragment
    }
  }
`;

const contentStyle = {
  padding: "20px 25px",
  minHeight: "calc(100vh - 64px)",
};

const containerStyle = {
  maxWidth: 800,
  margin: "auto",
};

const centeredLayoutPaths = ["/signin", "/signup"];

const AppLayout: React.FC = () => {
  const [user] = useAuth();
  const data = useLazyLoadQuery<LayoutQuery>(userQuery, {
    id: user?.id || "0",
  });
  const location = useLocation();
  const isCenteredLayout =
    centeredLayoutPaths.indexOf(location.pathname.trim().toLowerCase()) >= 0;

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[]}
          items={[
            { key: "home", label: <Link to="/">Home</Link> },
            { key: "signup", label: <Link to="/signup">Signup</Link> },
          ]}
        />
      </Header>

      <Content style={contentStyle}>
        <div style={containerStyle}>
          <Row gutter={16}>
            {!isCenteredLayout && (
              <Col xs={24} sm={24} md={8}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <UserInfo user={data.user} />
                  <Friends user={data.user} />
                  <FriendSuggestions user={data.user} />
                </Space>
              </Col>
            )}

            {isCenteredLayout && <Col xs={24} sm={24} md={4} />}

            <Col xs={24} sm={24} md={16}>
              <Outlet />
            </Col>

            {isCenteredLayout && <Col xs={24} sm={24} md={4} />}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
