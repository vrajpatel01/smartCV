import axiosInstance from "@/axios.config";

export const forgotPassword = async (email) => {
  return (await axiosInstance.post(`/admin/auth/forgot-password`, { email }))
    .data;
};
