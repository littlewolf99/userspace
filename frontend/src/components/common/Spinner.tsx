import * as React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const spinIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const Spinner: React.FC = () => (
  <div style={{ marginTop: 30, textAlign: "center" }}>
    <Spin indicator={spinIcon} />
  </div>
);

export default Spinner;
