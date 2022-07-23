import axios from "@/plugins/axios";

const misc = async () => {
  const { data } = await axios.get("misc");
  return data;
};

const cart = { misc };
export default cart;
