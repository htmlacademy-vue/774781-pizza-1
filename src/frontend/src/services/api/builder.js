import axios from "@/plugins/axios";

const normalizeSizes = (sizes) => {
  return sizes.sort((a, b) => {
    return (
      Number(a.name.replace(/\D/g, "")) - Number(b.name.replace(/\D/g, ""))
    );
  });
};

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
  return normalizeSizes(data);
};

const builder = { dough, sauces, ingredients, sizes };
export default builder;
