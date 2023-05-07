import * as React from "react";
import Block from "components/common/Block";
import PostForm, { PostData } from "./PostForm";
import { User } from "utils/auth";
import useCreatePost from "mutations/CreatePost";

interface PostCreateProps {
  user: User;
}

const PostCreate: React.FC<PostCreateProps> = ({ user }) => {
  const [createPost, pending] = useCreatePost();

  const handleSubmit = (input: PostData) => {
    createPost({
      variables: {
        input: {
          ...input,
          userId: user.id,
        },
      },
    });
  };

  return (
    <Block>
      <PostForm pending={pending} onSubmit={handleSubmit} />
    </Block>
  );
};

export default PostCreate;
