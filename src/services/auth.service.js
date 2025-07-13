import axiosInstance from "./axiosInstance";

export const signIn = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data;
};

export const signUp = async (firstName, lastName, email, password) => {
  const res = await axiosInstance.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });
  return res.data;
};

export const changePassword = async (currentPassword, newPassword, token) => {
  const res = await axiosInstance.put(
    "/auth/change-password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
