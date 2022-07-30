import axios from "@/plugins/axios";

const get = async () => {
  const { data } = await axios.get("addresses");
  return data;
};

const post = async (address) => {
  const { data } = await axios.post("addresses", address);
  return data;
};

const address = { get, post };
export default address;
