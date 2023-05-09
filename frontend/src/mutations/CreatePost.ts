import { graphql, useMutation } from "react-relay";
import { CreatePostMutation } from "__generated__/CreatePostMutation.graphql";

const createPostMutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      node {
        id
      }
    }
  }
`;

export default function useCreatePost() {
  return useMutation<CreatePostMutation>(createPostMutation);
}
