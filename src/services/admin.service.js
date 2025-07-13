import axiosInstance from "./axiosInstance";

// Dashboard Statistics
export const getDashboardStats = async (token) => {
  const response = await axiosInstance.get("/admin/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Product Analytics
export const getProductAnalytics = async (token) => {
  const response = await axiosInstance.get(
    "/admin/dashboard/product-analytics",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// User Management
export const getAllUsers = async (token) => {
  const response = await axiosInstance.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserById = async (userId, token) => {
  const response = await axiosInstance.get(`/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (userId, userData, token) => {
  const response = await axiosInstance.put(`/admin/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteUser = async (userId, token) => {
  const response = await axiosInstance.delete(`/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Product Management
export const getAllProducts = async (token) => {
  const response = await axiosInstance.get("/product/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFeaturedProducts = async (token) => {
  const response = await axiosInstance.get("/product/featured", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

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

// Category Management
export const getAllCategories = async (token) => {
  const response = await axiosInstance.get("/product/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

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

// Recent Activity (using cart items as proxy for orders)
export const getRecentCartActivity = async (token) => {
  try {
    // Use the new dedicated endpoint for recent activity
    const response = await axiosInstance.get(
      "/admin/dashboard/recent-activity",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recent cart activity:", error);
    return { payload: [] };
  }
};

// Orders Management (placeholder for future implementation)
export const getAllOrders = async (token) => {
  // This would be implemented when we have an orders table
  // For now, return empty array
  return { payload: [] };
};

export const updateOrderStatus = async (orderId, status, token) => {
  // This would be implemented when we have an orders table
  return { message: "Order status updated" };
};
