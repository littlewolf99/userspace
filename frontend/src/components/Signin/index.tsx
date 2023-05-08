import * as React from "react";
import SigninForm, { SigninData } from "./Form";
import useSignIn from "mutations/SignIn";
import { useAuth, useGuestMode } from "utils/auth";
import Block from "components/common/Block";

const Signin: React.FC = () => {
  const [, startNavigation] = React.useTransition();
  const [signIn, pending] = useSignIn();
  const [, setToken] = useAuth();
  const isGuest = useGuestMode();

  const handleSubmit = (input: SigninData) =>
    signIn({
      variables: {
        input,
      },
      updater(store, data) {
        const token = data.signIn?.token;
        if (token) {
          store.invalidateStore();
        }
      },
      onCompleted(response) {
        if (response.signIn) {
          const token = response.signIn.token;
          localStorage.setItem("authtoken", token);
          startNavigation(() => setToken(token));
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
