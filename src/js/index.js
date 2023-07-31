import {
  addToCompletedList,
  addToShoppingList,
  bootUp,
  clearCompleted,
  getShoppingList,
  removeItem,
  setPriority,
} from "./model";
import { renderCompletedList, renderShoppingList } from "./view";

const itemInput = document.querySelector("input[name='itemInput']");
const shoppingListDiv = document.querySelector(".shopping-list");
const completedDiv = document.querySelector(".completed");
const clearCompletedBtn = document.querySelector("#clear-completed");

itemInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    //Add to shopping list
    addToShoppingList(this.value);
    // Update the view of shopping list
    renderShoppingList();
    //Clear out the field so that it can be typed again
    this.value = "";
  }
});
shoppingListDiv.addEventListener("click", function (e) {
  if (e.target.parentElement.classList.contains("priority-control")) {
    const priority = e.target.classList.value;
    const itemId = e.target.parentElement.parentElement.getAttribute("data-id");
    console.log(itemId, priority);
    //Set priority
    setPriority(itemId, priority);
    renderShoppingList();
  }
  if (e.target.classList.contains("remove-btn")) {
    const itemId = e.target.parentElement.getAttribute("data-id");
    // Remove function
    if (removeItem(itemId)) {
      // rerender the list
      renderShoppingList();
    }
  }
});
shoppingListDiv.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("item")) {
    const getId = e.target.getAttribute("data-id");
    e.dataTransfer.setData("text/plain", getId);
  }
});

completedDiv.addEventListener("drop", function (e) {
  const itemId = e.dataTransfer.getData("text/plain");
  if (itemId) {
    // Add to the completed list
    addToCompletedList(itemId);
    // Update the completed list
    renderCompletedList();
    // Update the shopping list
    renderShoppingList();
  }
});

completedDiv.addEventListener("dragover", function (e) {
  e.preventDefault();
});

clearCompletedBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearCompleted();
  renderCompletedList();
});
(() => {
  bootUp();
  renderShoppingList();
  renderCompletedList();
})();
