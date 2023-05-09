import { graphql, useMutation } from "react-relay";
import { CreatePostMutation } from "__generated__/CreatePostMutation.graphql";

const createPostMutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!, $connections: [ID!]!) {
    createPost(input: $input) @prependEdge(connections: $connections) {
      node {
        ...FeedItemFragment
      }
    }
  }
`;

export default function useCreatePost() {
  return useMutation<CreatePostMutation>(createPostMutation);
}
