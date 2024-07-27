import axiosInstance from "@/axios.config";

export const login = async (data) => {
  return await axiosInstance.post("/admin/auth/login", data);
};
