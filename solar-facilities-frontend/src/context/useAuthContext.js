import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
  const currentAuthContext = useContext(AuthContext);

  if (!currentAuthContext) {
    throw new Error(
      "useAuthContext has to be used within <AuthContext.Provider>"
    );
  }

  return currentAuthContext;
};
