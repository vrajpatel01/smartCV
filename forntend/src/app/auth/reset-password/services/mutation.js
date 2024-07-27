import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "./api";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => resetPassword(data.password, data.token),
  });
};
