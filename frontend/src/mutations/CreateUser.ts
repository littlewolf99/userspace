import { graphql, useMutation } from "react-relay";

const createUserMutation = graphql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export default function useCreateUser() {
  return useMutation(createUserMutation);
}
