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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const authUserLogic = async (callback) => {
    try {
      setError(false);
      setLoading(true);
      const { token, id } = await callback();
      if (!token) {
        setError(true);
        return;
      }

      setLoggedIn(true);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(USER_ID_KEY, id);
      navigate(ROUTES.DASHBOARD);
    } catch {
      setLoggedIn(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginUser = async ({ email, password }) => {
    return authUserLogic(() => loginUser({ email, password }));
  };

  const handleRegisterUser = async ({ name, email, password }) => {
    return authUserLogic(() => registerUser({ name, email, password }));
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
        error,
        loading,
        token,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
