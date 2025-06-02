import axiosInstance from "./axiosInstance";

export const fetchProductCategories = async (token) => {
  const response = await axiosInstance.get("/product/categories");
  return response.data;
};

// , {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
