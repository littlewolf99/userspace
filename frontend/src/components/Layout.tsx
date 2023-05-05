import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Col, Layout, Menu, Row, theme } from "antd";

const { Header, Content } = Layout;

const colPadding = 25;

const contentStyle = {
  padding: "20px 25px",
  minHeight: "calc(100vh - 64px)",
};

const containerStyle = {
  maxWidth: 800,
  margin: "auto",
};

const centeredLayoutPaths = ["/login", "/signup"];

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
                <div
                  style={{
                    background: colorBgContainer,
                    padding: colPadding,
                  }}
                >
                  User info
                </div>
              </Col>
            )}

            {isCenteredLayout && <Col xs={24} sm={24} md={4} />}

            <Col xs={24} sm={24} md={16}>
              <div
                style={{
                  background: colorBgContainer,
                  padding: colPadding,
                }}
              >
                <Outlet />
              </div>
            </Col>

            {isCenteredLayout && <Col xs={24} sm={24} md={4} />}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
