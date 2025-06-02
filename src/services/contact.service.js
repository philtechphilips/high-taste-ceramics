import axiosInstance from "./axiosInstance";

export const contactUS = async (data) => {
  const response = await axiosInstance.post(`/contact`, { ...data });
  return response.data;
};
