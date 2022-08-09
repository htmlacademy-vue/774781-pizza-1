import JWTService from "@/services/jwt";
import axios from "@/plugins/axios";

const setAuthHeader = () => {
  const token = JWTService.getToken();
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
};

const login = async (params) => {
  const { data } = await axios.post("login", params);
  return data;
};

const logout = async () => {
  const { data } = await axios.delete("logout");
  return data;
};

const whoAmI = async () => {
  const { data } = await axios.get("whoAmI");
  return data;
};

const auth = { setAuthHeader, login, logout, whoAmI };
export default auth;
