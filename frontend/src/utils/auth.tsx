import * as React from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

type SetUser = React.Dispatch<React.SetStateAction<User | null>>;

const AuthContext = React.createContext<[User | null, SetUser]>([
  null,
  () => {},
]);

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);

  // TODO: get current signed-in user

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

type UseAuth = [User | null, SetUser];

export const useAuth = (signInRequired: boolean = true): UseAuth => {
  const [user, setUser] = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("authtoken");
      if (!token && signInRequired) {
        navigate("/signin");
      }
    }
  }, [user, navigate, signInRequired]);

  return [user, setUser];
};

export const useGuestMode = () => {
  const [user] = React.useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");
  const isGuest = !user && !token;

  React.useEffect(() => {
    if (!isGuest) {
      navigate("/");
    }
  }, [user, isGuest, navigate]);

  return isGuest;
};
