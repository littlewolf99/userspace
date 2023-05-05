import * as React from "react";
import SigninForm, { SigninData } from "./Form";
import useSignIn from "mutations/SignIn";
import { useAuth, useGuestMode } from "utils/auth";
import Block from "components/common/Block";

const Signin: React.FC = () => {
  const [signIn, pending] = useSignIn();
  const [, setUser] = useAuth();
  const isGuest = useGuestMode();

  const handleSubmit = (input: SigninData) =>
    signIn({
      variables: {
        input,
      },
      onCompleted(response) {
        if (response.signIn) {
          localStorage.setItem("authtoken", response.signIn.token);
          setUser(response.signIn.user);
        }
      },
    });

  if (!isGuest) {
    return null;
  }

  return (
    <Block>
      <SigninForm pending={pending} onSubmit={handleSubmit} />
    </Block>
  );
};

export default Signin;
