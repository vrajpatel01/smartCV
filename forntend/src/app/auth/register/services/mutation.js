import { dataTagSymbol, useMutation } from "@tanstack/react-query";
import { finalRegister, getRegisterOTP, verifyRegisterOTP } from "./api";

export function useGetRegisterOTP() {
  return useMutation({
    mutationFn: (email) => getRegisterOTP(email),
  });
}

export function useVerifyRegisterOTP() {
  return useMutation({
    mutationFn: (data) => verifyRegisterOTP(data.otp, data.otpToken),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data) => finalRegister(data),
  });
}
