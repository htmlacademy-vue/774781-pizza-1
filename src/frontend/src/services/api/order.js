import axios from "@/plugins/axios";

const post = async (order) => {
  const { data } = await axios.post("orders", order);
  return data;
};

const order = { post };
export default order;
