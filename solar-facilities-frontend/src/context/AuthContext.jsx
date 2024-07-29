import { createContext, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/user";
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from "../util/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../util/routes";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );

  const userId = useMemo(() => {
    return localStorage.getItem(USER_ID_KEY);
  }, [isLoggedIn]);

  const token = useMemo(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }, [isLoggedIn]);

  const [errorLogin, setErrorLogin] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);

  const handleLoginUser = async ({ email, password }) => {
    try {
      const { token, id } = await loginUser({ email, password });
      if (!token) {
        setErrorLogin(true);
        return;
      }

      setErrorLogin(false);
      setLoggedIn(true);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(USER_ID_KEY, id);
      navigate(ROUTES.DASHBOARD);
    } catch {
      setLoggedIn(false);
      setErrorLogin(true);
    }
  };

  const handleRegisterUser = async ({ name, email, password }) => {
    try {
      const { token, id } = await registerUser({ name, email, password });
      if (!token) {
        setErrorRegister(true);
        return;
      }

      setErrorRegister(false);
      setLoggedIn(true);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(USER_ID_KEY, id);
      navigate(ROUTES.DASHBOARD);
    } catch {
      setLoggedIn(false);
      setErrorRegister(true);
    }
  };

  const handleLogoutUser = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
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
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
