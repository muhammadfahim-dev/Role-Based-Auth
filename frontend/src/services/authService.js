import axios from "axios";

export const loginService = async (email, password) => {
  const res = await axios.post("/api/v1/user/login", { email, password });
  return res.data.user;
};

export const registerService = async (name, email, password, role) => {
  const res = await axios.post("/api/v1/user/register", {
    name,
    email,
    password,
    role,
  });
  return res.data.user;
};

export const logoutService = async () => {
  await axios.get("/api/v1/user/logout");
};
