const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Parses a JSON string and constructs from it a JavaScript value or object.
// ! Parse -> Break an item into its component parts.
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// If locally stored transactions is not null, becomes localStorageTransactions, else becomes empty array.
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Adds new transaction object to transactions list.
function addTransaction(e) {
    // Prevents default action unless event is explicitly handled.
    e.preventDefault();

    // Presents an alert message if the text or amount field is empty.
    if (text.nodeValue.trim() === '' || amount.nodeValue.trim() === '') {
        alert('Please add a text and amount');

    // Generates a transaction object if neither text or amount are empty.   
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            // Stores amount as integer.
            amount: +amount.value 
        }
        // Pushes transaction object to transactions array.
        transactions.push(transaction);

        // Adds transaction to transaction list.
        addTransactionList(transaction);

        // Calculates and updates total account value, income account value, and expenses account value.
        updateValues();

        // Updates local storage with latest JavaScript transactions array.
        updateLocalStorage();

        // Sets form inputs to be empty.
        text.value = '';
        amount.value = '';
    }
}

// Generates Id for transaction data.
function generateId() {
    // Generates random whole number between 0 and 100 million.
    return Math.floor(Math.random() * 100000000);
}

// Adds transaction to transaction list.
function addTransactionList(transaction) {
    // Gets sign for transaction amount polarity.
    const sign = transaction.amount < 0 ? '-' : '+'; 

    // Creates list element.
    const item = document.createElement('li'); 

    // Add class corresponding to polarity of transaction amount.
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = 
    // Adds sign and transacrion amount to list item's HTML.
    // Adds delete button to remove list item.
    `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${transaction.id})">x</button>
    `

    // Appends new list item to list.
    list.appendChild(item);
}

// Calculates and updates total account value, income account value, and expenses account value.
function updateValues() {
    // Creates array amounts from amount in each transaction in transactions.
    const amounts = transactions.map(transaction => transaction.amount);

    // Calculates total - Reduces amounts array to a single value with 2 variable points by adding each value in array starting from 0.
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // Calculates income - Reduces amounts array to single value with 2 variable points by adding each positive value in array starting from 0.
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    // Calcualtes expenses - Reduces amounts array to single value with 2 variable points by adding each negative value in array starting from 0.
    // Multiplies by -1, as absolute value is used in list item HTML.
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    // Sets elements' text to corresponding calculated values.
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Removes list item by id.
function removeItem(id) {
    // Finds transaction with given id from transactions array.
    transactions = transactions.filter(transaction => transaction.id !== id);

    // Updates local storage with latest JavaScript transactions array.
    updateLocalStorage();

    // Initialises application.
    init();
}

// Updates local storage with latest JavaScript transactions array.
function updateLocalStorage() {
    // Updates local storage with the key name of 'transactions,' and key value of transactions array as JSON object.
    // ! storage.setItem(keyName, keyValue) adds/updates key for given storage object.
    // ! JSON.stringify() converts JavaScript value to JSON object.
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Initialises application.
function init() {
    // Sets documents list to be empty.
    list.innerHTML = '';

    // Adds each object from transactions array to document's unordered list.
    transactions.forEach(addTransactionList);

    // Calculates and updates total account value, income account value, and expenses account value.
    updateValues();
}

// Initialises application.
init();

// Sets event listener for new transaction submsission.
form.addEventListener('submit', addTransaction);