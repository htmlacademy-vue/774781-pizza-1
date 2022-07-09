export const normalizeImagePath = (path) => {
  const imagePath = path.replace("/public/", "");
  return require(`@/assets/${imagePath}`);
};

export const displayItemPrice = (quantity, price) =>
  quantity > 1 ? `${quantity}x${price} ₽` : `${price} ₽`;
