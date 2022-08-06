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

const put = async (id, address) => {
  const { data } = await axios.put(`addresses/${id}`, address);
  return data;
};

const address = { get, post, deleteAddress, put };
export default address;
