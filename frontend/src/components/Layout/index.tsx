import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Col, Layout, Menu, Row, notification } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "utils/auth";
import Failed from "components/common/Failed";
import Spinner from "components/common/Spinner";
import Sidebar from "./Sidebar";
import Header from "./Header";

const { Content } = Layout;

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
  useAuth();
  const [, contextHolder] = notification.useNotification();
  const location = useLocation();
  const isCenteredLayout =
    centeredLayoutPaths.indexOf(location.pathname.trim().toLowerCase()) >= 0;

  return (
    <Layout className="layout">
      <Header />

      <Content style={contentStyle}>
        <div style={containerStyle}>
          <Row gutter={16}>
            {!isCenteredLayout && (
              <Col xs={24} sm={24} md={8}>
                <ErrorBoundary FallbackComponent={Failed}>
                  <React.Suspense fallback={<Spinner />}>
                    <Sidebar />
                  </React.Suspense>
                </ErrorBoundary>
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

      {contextHolder}
    </Layout>
  );
};

export default AppLayout;
