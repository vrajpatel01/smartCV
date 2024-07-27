import axiosInstance from "@/axios.config";

export const getRegisterOTP = async (email) => {
  return await axiosInstance.post("/admin/auth/register-otp", { email });
};

export const verifyRegisterOTP = async (otp, otpToken) => {
  return await axiosInstance.post("/admin/auth/verify-otp", { otp, otpToken });
};

export const finalRegister = async (data) => {
  return await axiosInstance.post("/admin/auth/register", data);
};
