import axiosInstance from "./axiosInstance";

// Get all orders
export const getAllOrders = async (token) => {
  try {
    const response = await axiosInstance.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId, token) => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, statusData, token) => {
  try {
    const response = await axiosInstance.put(`/orders/${orderId}`, statusData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// Get order statistics
export const getOrderStats = async (token) => {
  try {
    const response = await axiosInstance.get("/orders/stats/overview", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order stats:", error);
    throw error;
  }
};
