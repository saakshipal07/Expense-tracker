const balance=document.getElementById("current-bal");
const currentIncome=document.getElementById("current-income");
const currentexpense=document.getElementById("current-expense");
const transactionList=document.getElementById("transaction-list");
const transactionForm=document.getElementById("transaction-form");
const inputDescription=document.getElementById("description");
const inputAmount=document.getElementById("Amount");
const btn=document.getElementById("add-btn");

let transactionss=JSON.parse[localStorage.getItem("transactionss")] || [ ];

transactionForm.addEventListener('submit',addTransaction);
function addTransaction(e){
    e.preventDefault();
    const description =inputDescription.value.trim();
    const amount=parseFloat(inputAmount.value);
    console.log(description ,amount);

    transactionss.push({
        id:Date.now(),
        description,
        amount,
    });
    
    localStorage.setItem('transaction',JSON.stringify(transactionss));
    

    updateTransaction();
    updateSummery();

    transactionForm.reset();
}

function updateTransaction(){
    transactionList.innerHTML=" ";
   

    const recentTra=[...transactionss].reverse();
    

    recentTra.forEach((transaction)=> {
     const tr= createElementTransaction(transaction);

       transactionList.appendChild(tr);
    });
}
 function createElementTransaction(transaction){
    const li=document.createElement('li');
    li.classList.add('transaction');
   
    li.classList.add(transaction.amount >0 ?"income":"expense");
    

    li.innerHTML=`
    <span> ${transaction.description} </span>
    <span> ${formateCurrency(transaction.amount)}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})"> X </button>
    </span>  `;
    return li;

 }

 function updateSummery(){
    const balanc= transactionss.reduce((acc,transaction)=> acc+transaction.amount,0);

    const income= transactionss.filter((transaction) =>transaction.amount>0)
    .reduce((acc,transaction)=>acc+transaction.amount,0);
    console.log(income)

    const expense=transactionss.filter((transaction)=>transaction.amount<0)
    .reduce((acc,transaction)=>acc+transaction.amount,0);

    balance.textContent=formateCurrency(balanc);
   currentIncome.textContent=formateCurrency(income);
   currentexpense.textContent=formateCurrency(expense);

 }

 function formateCurrency(number){
    return new Intl.NumberFormat('en-US',{
             style:'currency',
            currency:"USD"}).format(number);

 }

 function removeTransaction(id){
    transactionss=transactionss.filter(transaction => transaction.id !== id);

    localStorage.setItem("transactionss",JSON.stringify(transactionss));

    updateSummery();
    updateTransaction();
 }




