import axiosInstance from "./axiosInstance";

// Get all blogs (admin)
export const getAllBlogs = async (token) => {
  try {
    const response = await axiosInstance.get("/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Get blog by ID
export const getBlogById = async (blogId, token) => {
  try {
    const response = await axiosInstance.get(`/blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

// Create new blog
export const createBlog = async (blogData, token) => {
  try {
    const response = await axiosInstance.post("/blogs", blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// Update blog
export const updateBlog = async (blogId, blogData, token) => {
  try {
    const response = await axiosInstance.put(`/blogs/${blogId}`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete blog
export const deleteBlog = async (blogId, token) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

// Get published blogs (public)
export const getPublishedBlogs = async () => {
  try {
    const response = await axiosInstance.get("/blogs/public/published");
    return response.data;
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    throw error;
  }
};

// Get blog by slug (public)
export const getBlogBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`/blogs/public/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
};
