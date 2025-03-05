import foodClasses from "./food101_labels.json";

export const getFoodName = (classIndex) => {
  return foodClasses[classIndex] || "Not Known Food from getFoodName.js";
};