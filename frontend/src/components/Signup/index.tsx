import * as React from "react";
import { useNavigate } from "react-router-dom";
import SignupForm, { SignupData } from "./Form";
import useCreateUser from "mutations/CreateUser";
import { useGuestMode } from "utils/auth";

const Signup: React.FC = () => {
  const [createUser, pending] = useCreateUser();
  const navigate = useNavigate();
  const isGuest = useGuestMode();

  const handleSubmit = (input: SignupData) =>
    createUser({
      variables: {
        input,
      },
      onCompleted() {
        navigate("/signin");
      },
    });

  if (!isGuest) {
    return null;
  }

  return <SignupForm pending={pending} onSubmit={handleSubmit} />;
};

export default Signup;
