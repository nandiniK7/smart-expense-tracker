let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(){

let desc = document.getElementById("description").value.trim();
let amount = document.getElementById("amount").value;
let type = document.getElementById("type").value;

if(desc === "" || amount === ""){
alert("Please enter description and amount");
return;
}

let transaction = {
id: Date.now(),
desc: desc,
amount: Number(amount),
type: type
};

transactions.push(transaction);

saveData();
resetForm();
displayTransactions();
}

function displayTransactions(filter="all"){

let list = document.getElementById("list");
list.innerHTML = "";

let filtered = transactions.filter(t => filter === "all" || t.type === filter);

filtered.forEach(t => {

let li = document.createElement("li");

li.classList.add(t.type);

li.innerHTML = `
<span>${t.desc}</span> 
<strong>₹${t.amount}</strong>

<div class="actions">
<button onclick="editTransaction(${t.id})">✏️</button>
<button onclick="deleteTransaction(${t.id})">🗑️</button>
</div>
`;

list.appendChild(li);

});

updateSummary();
}

function deleteTransaction(id){

transactions = transactions.filter(t => t.id !== id);

saveData();

displayTransactions();
}

function editTransaction(id){

let transaction = transactions.find(t => t.id === id);

document.getElementById("description").value = transaction.desc;
document.getElementById("amount").value = transaction.amount;
document.getElementById("type").value = transaction.type;

deleteTransaction(id);
}

function resetForm(){

document.getElementById("description").value = "";
document.getElementById("amount").value = "";
document.getElementById("type").value = "income";
}

function updateSummary(){

let income = transactions
.filter(t => t.type === "income")
.reduce((total,t)=> total + t.amount,0);

let expense = transactions
.filter(t => t.type === "expense")
.reduce((total,t)=> total + t.amount,0);

let balance = income - expense;

document.getElementById("income").innerText = income;
document.getElementById("expense").innerText = expense;
document.getElementById("balance").innerText = balance;

let balanceElement = document.getElementById("balance");

if(balance >= 0){
balanceElement.style.color = "#2ecc71";
}else{
balanceElement.style.color = "#e74c3c";
}
}

function filterTransactions(){

let filter = document.querySelector('input[name="filter"]:checked').value;

displayTransactions(filter);
}

function saveData(){

localStorage.setItem("transactions", JSON.stringify(transactions));
}

displayTransactions();
