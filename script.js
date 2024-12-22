// Get references to DOM elements
const itemInput = document.getElementById('item');
const priceInput = document.getElementById('price');
const budgetInput = document.getElementById('budget');
const addItemButton = document.getElementById('add-item-btn');
const groceryList = document.getElementById('grocery-list');
const totalPriceElement = document.getElementById('total-price');
const budgetRemainingElement = document.getElementById('budget-remaining');
const budgetStatusElement = document.getElementById('budget-status');

// Initialize variables
let groceryItems = [];
let totalPrice = 0;
let budget = 0;

// Function to update the display
function updateDisplay() {
  // Update total price
  totalPriceElement.textContent = totalPrice.toFixed(2);

  // Calculate remaining budget
  const remainingBudget = budget - totalPrice;
  budgetRemainingElement.textContent = remainingBudget.toFixed(2);

  // Show budget alert if over budget
  if (remainingBudget < 0) {
    budgetStatusElement.style.color = 'red';
    budgetStatusElement.textContent = `You have exceeded your budget by $${Math.abs(remainingBudget).toFixed(2)}`;
  } else {
    budgetStatusElement.style.color = 'green';
    budgetStatusElement.textContent = `Budget Remaining: $${remainingBudget.toFixed(2)}`;
  }
}

// Function to add item to list
function addItem() {
  const itemName = itemInput.value.trim();
  const itemPrice = parseFloat(priceInput.value.trim());

  if (itemName === '' || isNaN(itemPrice) || itemPrice <= 0) {
    alert('Please enter valid item and price.');
    return;
  }

  // Add item to list
  groceryItems.push({ name: itemName, price: itemPrice });
  totalPrice += itemPrice;

  // Create list item element
  const listItem = document.createElement('li');
  listItem.innerHTML = `${itemName} - $${itemPrice.toFixed(2)} <button onclick="removeItem(${groceryItems.length - 1})">Remove</button>`;

  // Append to grocery list
  groceryList.appendChild(listItem);

  // Update display
  updateDisplay();

  // Clear input fields
  itemInput.value = '';
  priceInput.value = '';
}

// Function to remove item from list
function removeItem(index) {
  const removedItem = groceryItems.splice(index, 1)[0];
  totalPrice -= removedItem.price;

  // Remove item from the list DOM
  groceryList.children[index].remove();

  // Update display
  updateDisplay();
}

// Function to handle budget input
budgetInput.addEventListener('input', () => {
  budget = parseFloat(budgetInput.value.trim()) || 0;
  updateDisplay();
});

// Add event listener to add item button
addItemButton.addEventListener('click', addItem);
