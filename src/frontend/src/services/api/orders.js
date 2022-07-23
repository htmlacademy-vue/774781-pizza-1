import axios from "@/plugins/axios";

const post = async (order) => {
  const { data } = await axios.post("orders", order);
  return data;
};

const get = async () => {
  const { data } = await axios.get("orders");
  return data;
};

const deleteOrder = async (id) => {
  const { data } = await axios.delete(`orders/${id}`);
  return data;
};

const orders = { post, get, deleteOrder };
export default orders;
