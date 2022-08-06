import axios from "@/plugins/axios";

const get = async () => {
  const { data } = await axios.get("addresses");
  return data;
};

const post = async (address) => {
  const { data } = await axios.post("addresses", address);
  return data;
};

const deleteAddress = async (id) => {
  const { data } = await axios.delete(`addresses/${id}`);
  return data;
};

const address = { get, post, deleteAddress };
export default address;
