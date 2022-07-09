import { SAVE_ORDER } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    orders: [
      {
        userId: "0db253f9-232a-4448-bb36-8823c944e34b",
        phone: "+777 777 777",
        address: {
          street: "string",
          building: "string",
          flat: "string",
          comment: "string",
        },
        pizzas: [
          {
            name: "Огонь пицца",
            sauceId: 2,
            doughId: 2,
            sizeId: 3,
            quantity: 1,
            ingredients: [
              {
                ingredientId: "2",
                quantity: 2,
              },
              {
                ingredientId: "3",
                quantity: 1,
              },
              {
                ingredientId: "4",
                quantity: 1,
              },
              {
                ingredientId: "6",
                quantity: 2,
              },
              {
                ingredientId: "8",
                quantity: 1,
              },
              {
                ingredientId: "10",
                quantity: 2,
              },
              {
                ingredientId: "11",
                quantity: 1,
              },
              {
                ingredientId: "12",
                quantity: 2,
              },
              {
                ingredientId: "14",
                quantity: 1,
              },
              {
                ingredientId: "15",
                quantity: 1,
              },
            ],
          },
          {
            name: "Оу",
            sauceId: 2,
            doughId: 2,
            sizeId: 2,
            quantity: 1,
            ingredients: [
              {
                ingredientId: "3",
                quantity: 1,
              },
              {
                ingredientId: "4",
                quantity: 2,
              },
              {
                ingredientId: "6",
                quantity: 3,
              },
              {
                ingredientId: "7",
                quantity: 3,
              },
            ],
          },
        ],
        misc: [
          {
            miscId: "1",
            quantity: 3,
          },
          {
            miscId: "2",
            quantity: 3,
          },
          {
            miscId: "3",
            quantity: 1,
          },
        ],
      },
      {
        userId: "cbb0b459-0d2f-4b59-9c93-74b855551d6b",
        phone: "+777 777 777",
        address: {
          street: "string",
          building: "string",
          flat: "string",
          comment: "string",
        },
        pizzas: [
          {
            name: "Izy breezy",
            sauceId: 1,
            doughId: 1,
            sizeId: 2,
            quantity: 2,
            ingredients: [
              {
                ingredientId: "1",
                quantity: 1,
              },
              {
                ingredientId: "5",
                quantity: 3,
              },
              {
                ingredientId: "9",
                quantity: 3,
              },
              {
                ingredientId: "10",
                quantity: 3,
              },
              {
                ingredientId: "11",
                quantity: 3,
              },
              {
                ingredientId: "15",
                quantity: 3,
              },
            ],
          },
        ],
        misc: [
          {
            miscId: "1",
            quantity: 3,
          },
        ],
      },
    ],
  },

  mutations: {
    [SAVE_ORDER](state, order) {
      state.orders.push(order);
    },
  },

  actions: {
    async postOrder(_, orderItem) {
      const postedOrder = await this.$api.order.post(orderItem);
      console.log(postedOrder);
    },
  },
};
