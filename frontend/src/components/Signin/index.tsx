import * as React from "react";
import SigninForm, { SigninData } from "./Form";
import useSignIn from "mutations/SignIn";

const Signin: React.FC = () => {
  const [signIn, pending] = useSignIn();

  const handleSubmit = (input: SigninData) =>
    signIn({
      variables: {
        input,
      },
    });

  return <SigninForm pending={pending} onSubmit={handleSubmit} />;
};

export default Signin;
