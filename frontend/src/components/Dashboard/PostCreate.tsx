import * as React from "react";
import Block from "components/common/Block";
import PostForm, { PostData } from "./PostForm";
import useCreatePost from "mutations/CreatePost";

const PostCreate: React.FC = () => {
  const [createPost, pending] = useCreatePost();

  const handleSubmit = (input: PostData) => {
    createPost({
      variables: {
        input: {
          ...input,
        },
      },
    });
  };

  return (
    <Block padding={15}>
      <PostForm pending={pending} onSubmit={handleSubmit} />
    </Block>
  );
};

export default PostCreate;
