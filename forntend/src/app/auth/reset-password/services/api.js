import axiosInstance from "@/axios.config";

export const resetPassword = async (password, token) => {
  return (
    await axiosInstance.patch(`/admin/auth/reset-password`, { password, token })
  ).data;
};
