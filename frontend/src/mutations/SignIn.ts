import { graphql, useMutation } from "react-relay";
import { SignInMutation } from "__generated__/SignInMutation.graphql";

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

export default function useSignIn() {
  return useMutation<SignInMutation>(signInMutation);
}
