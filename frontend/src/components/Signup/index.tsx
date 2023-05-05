import * as React from "react";
import { useNavigate } from "react-router-dom";
import SignupForm, { SignupData } from "./Form";
import useCreateUser from "mutations/CreateUser";

const Signup: React.FC = () => {
  const [createUser, pending] = useCreateUser();
  const navigate = useNavigate();

  const handleSubmit = (input: SignupData) =>
    createUser({
      variables: {
        input,
      },
      onCompleted() {
        navigate("/signin");
      },
    });

  return <SignupForm pending={pending} onSubmit={handleSubmit} />;
};

export default Signup;
