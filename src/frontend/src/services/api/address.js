import axios from "@/plugins/axios";

const get = async () => {
  const { data } = await axios.get("addresses");
  return data;
};

const address = { get };
export default address;
