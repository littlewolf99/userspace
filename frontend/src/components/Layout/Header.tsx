import * as React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  // const [token] = useAuth(false);

  return (
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
  );
};

export default AppHeader;
