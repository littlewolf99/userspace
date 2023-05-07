import { graphql, useMutation } from "react-relay";
import { CreateUserMutation } from "__generated__/CreateUserMutation.graphql";

const createUserMutation = graphql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      cursor
      node {
        id
      }
    }
  }
`;

export default function useCreateUser() {
  return useMutation<CreateUserMutation>(createUserMutation);
}
