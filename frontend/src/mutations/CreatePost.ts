import { graphql, useMutation } from "react-relay";
import { CreatePostMutation } from "__generated__/CreatePostMutation.graphql";

const createPostMutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      cursor
      node {
        ...FeedItemFragment
      }
    }
  }
`;

export default function useCreatePost() {
  return useMutation<CreatePostMutation>(createPostMutation);
}
