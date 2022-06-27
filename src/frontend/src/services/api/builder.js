import axios from "@/plugins/axios";

const dough = async () => {
  const { data } = await axios.get("dough");
  return data;
};

const sauces = async () => {
  const { data } = await axios.get("sauces");
  return data;
};

const ingredients = async () => {
  const { data } = await axios.get("ingredients");
  return data;
};

const sizes = async () => {
  const { data } = await axios.get("sizes");
  return data;
};

const builder = { dough, sauces, ingredients, sizes };
export default builder;
