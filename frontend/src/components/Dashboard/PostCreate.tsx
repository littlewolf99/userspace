import * as React from "react";
import { graphql, useFragment } from "react-relay";
import Block from "components/common/Block";
import PostForm, { PostData } from "./PostForm";
import useCreatePost from "mutations/CreatePost";
import { PostCreateFragment$key } from "__generated__/PostCreateFragment.graphql";

const postCreateFragment = graphql`
  fragment PostCreateFragment on User {
    id
  }
`;

interface PostCreateProps {
  user: PostCreateFragment$key;
}

const PostCreate: React.FC<PostCreateProps> = ({ user }) => {
  const data = useFragment(postCreateFragment, user);
  const [createPost, pending] = useCreatePost();

  const handleSubmit = (input: PostData) => {
    createPost({
      variables: {
        input: {
          ...input,
          userId: data.id,
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
