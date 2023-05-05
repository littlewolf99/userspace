import { graphql, useMutation } from "react-relay";

const signInMutation = graphql`
  mutation SignInMutation($input: SignInInput!) {
    signIn(input: $input) {
      user {
        id
        username
        email
        firstName
        lastName
      }
      token
    }
  }
`;

export default function useCreateUser() {
  return useMutation(signInMutation);
}
