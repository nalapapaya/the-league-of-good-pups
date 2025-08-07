export const getAvgFromRange = (value) => {
  if (!value.includes("-")) return parseFloat(value); //return number
  const [low, high] = value.split(" - ").map(Number);
  return String(Math.round((low + high) / 2));
};