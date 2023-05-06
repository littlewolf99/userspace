import * as React from "react";
import { Space, Typography } from "antd";
import Block from "../common/Block";

const Suggestions: React.FC = () => {
  return (
    <Block padding={20}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Text strong style={{ fontSize: "0.9em" }}>
          Suggestions
        </Typography.Text>
      </Space>
    </Block>
  );
};

export default Suggestions;
