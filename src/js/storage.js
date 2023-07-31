export const saveToStore = function ({ shoppingList, completedList }) {
  window.localStorage.setItem(
    "shoppingList_active",
    JSON.stringify(shoppingList)
  );
  window.localStorage.setItem(
    "shoppingList_completed",
    JSON.stringify(completedList)
  );
};
export const getFromLocalStorage = function () {
  const getActive = window.localStorage.getItem("shoppingList_active");
  const getCompleted = window.localStorage.getItem("shoppingList_completed");
  return {
    active: getActive ? JSON.parse(getActive) : [],
    completed: getCompleted ? JSON.parse(getCompleted) : [],
  };
};
