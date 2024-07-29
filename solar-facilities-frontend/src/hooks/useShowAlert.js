import { useEffect, useState } from "react";

export const useShowAlert = (callback) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(callback, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [success, error]);

  return { success, error, setSuccess, setError };
};
