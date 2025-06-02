import axiosInstance from "./axiosInstance";

export const fetchProductCategories = async (token) => {
  const response = await axiosInstance.get("/product/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
