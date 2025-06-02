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
