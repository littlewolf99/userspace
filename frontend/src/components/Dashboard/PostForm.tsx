import * as React from "react";
import { Button, Form, Input } from "antd";

export interface PostData {
  content: string;
}

interface PostFormProps {
  pending: boolean;
  onSubmit: (data: PostData) => void;
}

const rules = {
  content: [
    {
      required: true,
      message: "Please write down what you'd like to share with your friends",
    },
  ],
};

const PostForm: React.FC<PostFormProps> = ({ pending, onSubmit }) => (
  <Form name="post" onFinish={onSubmit}>
    <Form.Item name="content" rules={rules.content}>
      <Input />
    </Form.Item>

    <Button type="primary" htmlType="submit" loading={pending}>
      {!pending && "Post"}
    </Button>
  </Form>
);

export default PostForm;
