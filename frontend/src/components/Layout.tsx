import * as React from "react";
import { Outlet } from "react-router-dom";
import { Col, Layout, Menu, Row, theme } from "antd";

const { Header, Content } = Layout;

const colPadding = 15;

const contentStyle = {
  padding: "20px 15px",
  minHeight: "calc(100vh - 64px)",
};

const containerStyle = {
  maxWidth: 800,
  margin: "auto",
};

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[]}
          items={[
            { key: "home", label: "Home" },
            { key: "signup", label: "Signup" },
          ]}
        />
      </Header>
      <Content style={contentStyle}>
        <div style={containerStyle}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <div
                style={{
                  background: colorBgContainer,
                  padding: colPadding,
                }}
              ></div>
            </Col>

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
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
