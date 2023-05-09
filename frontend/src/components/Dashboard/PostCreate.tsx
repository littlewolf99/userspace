import * as React from "react";
import Block from "components/common/Block";
import PostForm, { PostData } from "./PostForm";
import useCreatePost from "mutations/CreatePost";
import { ConnectionHandler } from "relay-runtime";

interface PostCreateProps {
  feedConnectionId: string;
}

const PostCreate: React.FC<PostCreateProps> = ({ feedConnectionId }) => {
  const [createPost, pending] = useCreatePost();

  const handleSubmit = (input: PostData) => {
    const connectionId = ConnectionHandler.getConnectionID(
      feedConnectionId,
      "FeedFragment__feed"
    );

    createPost({
      variables: {
        connections: [connectionId],
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
