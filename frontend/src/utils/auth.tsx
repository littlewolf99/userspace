import * as React from "react";
import { useNavigate } from "react-router-dom";

type SetToken = React.Dispatch<React.SetStateAction<string | null>>;

const AuthContext = React.createContext<[string | null, SetToken]>([
  null,
  () => {},
]);

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("authtoken")
  );

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
};

type UseAuth = [string | null, SetToken];

export const useAuth = (signInRequired: boolean = true): UseAuth => {
  const [token, setToken] = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token && signInRequired) {
      navigate("/signin");
    }
  }, [token, navigate, signInRequired]);

  return [token, setToken];
};

export const useGuestMode = () => {
  const [token] = React.useContext(AuthContext);
  const navigate = useNavigate();
  const isGuest = !token;

  React.useEffect(() => {
    if (!isGuest) {
      navigate("/");
    }
  }, [isGuest, navigate]);

  return isGuest;
};
