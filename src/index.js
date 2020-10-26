const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Parses a JSON string and constructs from it a JavaScript value or object.
// Parse -> Break an item into its component parts.
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
        transactions.push(transaction) 
    }
}

// Generates Id for transaction data.
function generateId() {
    // Generates random whole number between 0 and 100 million.
    return Math.floor(Math.random() * 100000000);
}

//
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
    <button class="delete-btn" onclick="removeItem(${transaction.id})>x</button>
    `

    // Appends new list item to list.
    list.appendChild(item);
}