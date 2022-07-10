import axios from "@/plugins/axios";

const normalize = (orders) => {
  return orders.map(({ id, orderMisc, orderPizzas }) => {
    const pizzas = orderPizzas.map((pizza) => {
      const ingredients = pizza.ingredients.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.name }),
        {}
      );

      return {
        ...pizza,
        ingredients,
      };
    });

    return {
      id,
      misc: orderMisc,
      pizzas,
    };
  });
};

const post = async (order) => {
  const { data } = await axios.post("orders", order);
  return data;
};

const get = async () => {
  const { data } = await axios.get("orders");
  return normalize(data);
};

const orders = { post, get };
export default orders;
