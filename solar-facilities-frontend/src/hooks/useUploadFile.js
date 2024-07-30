import { useState } from "react";
import { uploadFile } from "../services/file";

export const useUploadFile = () => {
  const [loading, setLoading] = useState(false);

  const uploadCSVFile = async ({ file, id }, token) => {
    try {
      setLoading(true);
      await uploadFile({ file, id }, token);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return { uploadCSVFile, loading };
};
