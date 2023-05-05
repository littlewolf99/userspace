import * as React from "react";
import SigninForm, { SigninData } from "./Form";
import useSignIn from "mutations/SignIn";
import { useAuth, useGuestMode } from "utils/auth";

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

  return <SigninForm pending={pending} onSubmit={handleSubmit} />;
};

export default Signin;
