import axiosInstance from "./axiosInstance";

export const fetchProductCategories = async (token) => {
  const response = await axiosInstance.get("/product/categories");
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/product/products");
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

// Admin Product Management
export const addProduct = async (productData, token) => {
  const response = await axiosInstance.post("/product", productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProduct = async (productId, productData, token) => {
  const response = await axiosInstance.put(
    `/product/${productId}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const deleteProduct = async (productId, token) => {
  const response = await axiosInstance.delete(`/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Admin Category Management
export const addCategory = async (categoryData, token) => {
  const response = await axiosInstance.post("/product/category", categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCategory = async (categoryId, categoryData, token) => {
  const response = await axiosInstance.put(
    `/admin/categories/${categoryId}`,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const deleteCategory = async (categoryId, token) => {
  const response = await axiosInstance.delete(
    `/product/category/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
