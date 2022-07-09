export const normalizeImagePath = (path) => {
  const imagePath = path.replace("/public/", "");
  return require(`@/assets/${imagePath}`);
};
