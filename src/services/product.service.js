import axiosInstance from "./axiosInstance";

export const fetchProductCategories = async (token) => {
  const response = await axiosInstance.get("/product/categories");
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/product");
  return response.data;
};

export const featuredProduct = async () => {
  const response = await axiosInstance.get("/product/featured");
  return response.data;
};

export const fetchProductsByCategoryId = async (categoryId) => {
  const response = await axiosInstance.get(`/product/category/${categoryId}`);
  return response.data;
};

export const featuredProductById = async (product_id) => {
  const response = await axiosInstance.get(`/product/${product_id}`);
  return response.data;
};

export const checkout = async (data, token) => {
  console.log("Checkout data:", data);
  const response = await axiosInstance.post(
    `/cart/checkout`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
