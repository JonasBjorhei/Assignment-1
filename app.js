const buttonWork = document.getElementById("work");
const buttonMoneyToBank = document.getElementById("moneyToBank");
const buttonAdd = document.getElementById("add");
const buttonTakeLoan = document.getElementById("takeLoan");
const selectComputers = document.getElementById("computers");

let moneyBankElement = document.getElementById("moneyBank");
let moneyWalletElement = document.getElementById("moneyWallet");
let loanElement = document.getElementById("loan");
let moneyInWallet = 0;
let moneyInBank = 0;
let loanAmount = 0;
let bankLoan = false;

function buttonTakeLoanPressed(){
 loanAmount = window.prompt("How much would you like to loan?");
 loanAmount = parseInt(loanAmount);

 if(loanAmount<(moneyInBank*2) && bankLoan == false){
    alert("Loan successful");
 bankLoan = true;
 loanElement.innerText = loanAmount;

 //crete new button to repai loan
 }
 else {
    alert("Loan unsuccessful")
    loanAmount = 0;
    bankLoan = false;
 }
};


function buttonWorkPressed(){
    moneyWalletElement.innerText = moneyInWallet +=100; 
};

function buttonMoneyToBankPressed(){
    if(bankLoan == true){
        moneyInBank += moneyInWallet-(moneyInWallet/10);
        loanAmount -=(moneyInWallet/10)
        moneyInWallet = 0;
        if (loanAmount <= 0){
            moneyInBank -=loanAmount;
            loanAmount = 0;
            bankLoan = false;
        };
        moneyBankElement.innerText = moneyInBank;
        moneyWalletElement.innerText = moneyInWallet;
        loanElement.innerText = loanAmount;
    }
    else{
        moneyInBank += moneyInWallet;
        moneyInWallet = 0;
        moneyBankElement.innerText = moneyInBank;
        moneyWalletElement.innerText = moneyInWallet;
    }
};

buttonTakeLoan.addEventListener("click", buttonTakeLoanPressed);
buttonWork.addEventListener("click", buttonWorkPressed);
buttonMoneyToBank.addEventListener("click", buttonMoneyToBankPressed);