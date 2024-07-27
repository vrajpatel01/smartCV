import { useMutation } from "@tanstack/react-query";
import { login } from "./api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => login(data),
  });
};
