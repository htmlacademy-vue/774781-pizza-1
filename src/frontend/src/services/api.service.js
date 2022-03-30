import { axiosInstance as axios } from "@/plugins/axios";

export const getDough = async () => {
  const { data } = await axios.get("/dough");
  return data;
};

export const getIngredients = async () => {
  const { data } = await axios.get("/ingredients");
  return data;
};

export const getSizes = async () => {
  const { data } = await axios.get("/sizes");
  return data;
};

export const getSauces = async () => {
  const { data } = await axios.get("/sauces");
  return data;
};

export const getMisc = async () => {
  const { data } = await axios.get("/misc");
  return data;
};
