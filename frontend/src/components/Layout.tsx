import * as React from "react";
import { Outlet } from "react-router-dom";
import { Col, Layout, Menu, Row, theme } from "antd";

const { Header, Content } = Layout;

const gridLayout = {
  xs: [0, 24, 24, 24, 0],
  sm: [0, 24, 24, 24, 0],
  md: [0, 24, 24, 24, 0],
  lg: [1, 6, 10, 6, 1],
  xl: [2, 5, 10, 5, 2],
};

const gridColSizes = new Array(5).fill(0).map((_, idx) => ({
  xs: gridLayout.xs[idx],
  sm: gridLayout.sm[idx],
  md: gridLayout.md[idx],
  lg: gridLayout.lg[idx],
  xl: gridLayout.xl[idx],
}));

const colPadding = 15;

const contentStyle = {
  padding: "20px 15px",
  minHeight: "calc(100vh - 64px)",
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
        <Row gutter={16}>
          <Col {...gridColSizes[0]} />

          <Col {...gridColSizes[1]} />

          <Col {...gridColSizes[2]}>
            <div
              style={{
                background: colorBgContainer,
                padding: colPadding,
              }}
            >
              <Outlet />
            </div>
          </Col>

          <Col {...gridColSizes[3]} />

          <Col {...gridColSizes[4]} />
        </Row>
      </Content>
    </Layout>
  );
};

export default AppLayout;
