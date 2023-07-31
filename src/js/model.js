import { nanoid } from "nanoid";
import { getFromLocalStorage, saveToStore } from "./storage";
let shoppingList = [];
let completedList = [];

export const addToShoppingList = (item) => {
  const itemId = nanoid();
  shoppingList.push({
    id: itemId,
    item,
    priority: "normal",
  });
  saveToStore({
    shoppingList,
    completedList,
  });
};
export const setPriority = (itemId, priority) => {
  shoppingList = shoppingList.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        priority: priority,
      };
    }
    return item;
  });
  saveToStore({
    shoppingList,
    completedList,
  });
};

export const removeItem = (itemId) => {
  const confirm = window.confirm("Are you sure you want to remove this task?");
  if (confirm) {
    shoppingList = shoppingList.filter(({ id }) => id !== itemId);
    saveToStore({
      shoppingList,
      completedList,
    });
    return true;
  }
  return false;
};

export const getShoppingList = () => shoppingList;

export const addToCompletedList = (itemId) => {
  const getItemId = shoppingList.find(({ id }) => id === itemId);
  shoppingList = shoppingList.filter(({ id }) => id !== itemId);
  completedList = [...completedList, getItemId];
  saveToStore({
    shoppingList,
    completedList,
  });
};

export const getCompletedList = () => completedList;

export const clearCompleted = () => {
  completedList = [];
  saveToStore({
    shoppingList,
    completedList,
  });
};

export const bootUp = () => {
  const { active, completed } = getFromLocalStorage();
  shoppingList = active;
  completedList = completed;
};
