import axios from "@/plugins/axios";

const normalize = (orders) =>
  orders.map(({ id, orderMisc, orderPizzas }) => {
    const pizzas = orderPizzas.map((pizza) => {
      const ingredients = pizza.ingredients.map(
        ({ ingredientId, quantity }) => ({
          [ingredientId]: quantity,
        })
      );

      return {
        ...pizza,
        ingredients,
      };
    });

    return {
      id: id.toString(),
      misc: orderMisc || null,
      pizzas,
    };
  });

const post = async (order) => {
  const { data } = await axios.post("orders", order);
  return data;
};

const get = async () => {
  const { data } = await axios.get("orders");
  return normalize(data);
};

const deleteOrder = async (id) => {
  const { data } = await axios.delete(`orders/${id}`);
  return data;
};

const orders = { post, get, deleteOrder };
export default orders;
