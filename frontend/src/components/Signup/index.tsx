import * as React from "react";
import SignupForm, { SignupData } from "./Form";
import useCreateUser from "mutations/CreateUser";

const Signup: React.FC = () => {
  const [createUser, pending] = useCreateUser();

  const handleSubmit = (input: SignupData) =>
    createUser({
      variables: {
        input,
      },
    });

  return <SignupForm pending={pending} onSubmit={handleSubmit} />;
};

export default Signup;
