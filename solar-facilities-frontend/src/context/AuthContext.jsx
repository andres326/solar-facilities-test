import { createContext, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/user";
import { ACCESS_TOKEN_KEY } from "../util/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../util/routes";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );

  const token = useMemo(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }, [isLoggedIn]);

  const [errorLogin, setErrorLogin] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);

  const handleLoginUser = async ({ email, password }) => {
    try {
      const { token } = await loginUser({ email, password });
      if (!token) {
        setErrorLogin(true);
        return;
      }

      setErrorLogin(false);
      setLoggedIn(true);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      navigate(ROUTES.DASHBOARD);
    } catch {
      setLoggedIn(false);
      setErrorLogin(true);
    }
  };

  const handleRegisterUser = async ({ name, email, password }) => {
    try {
      const { token } = await registerUser({ name, email, password });
      if (!token) {
        setErrorRegister(true);
        return;
      }

      setErrorRegister(false);
      setLoggedIn(true);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      navigate(ROUTES.DASHBOARD);
    } catch {
      setLoggedIn(false);
      setErrorRegister(true);
    }
  };

  const handleLogoutUser = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setLoggedIn(false);
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        handleLoginUser,
        handleLogoutUser,
        handleRegisterUser,
        errorLogin,
        errorRegister,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
