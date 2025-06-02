import axiosInstance from "./axiosInstance";

export const fetchProductCategories = async (token) => {
  const response = await axiosInstance.get("/product/categories");
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/product");
  return response.data;
};

export const fetchProductsByCategoryId = async (categoryId) => {
  const response = await axiosInstance.get(`/product/category/${categoryId}`);
  return response.data;
};

// , {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
