import { LoadingContext } from "@/contexts/LoadingContext";
import { useContext } from "react";

// 3. Custom hook để dùng cho tiện
export const useLoading = () => {
  return useContext(LoadingContext);
};
