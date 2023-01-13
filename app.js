const buttonWork = document.getElementById("work");
const buttonMoneyToBank = document.getElementById("moneyToBank");
const buttonAdd = document.getElementById("add");
const buttonTakeLoan = document.getElementById("takeLoan");
const selectComputers = document.getElementById("computers");
const buttonPayBackLoanPosition = document.getElementById("payBackLoanPosition");

let moneyBankElement = document.getElementById("moneyBank");
let moneyWalletElement = document.getElementById("moneyWallet");
let loanElement = document.getElementById("loan");
let moneyInWallet = 0;
let moneyInBank = 0;
let loanAmount = 0;
let userInput = 0;
let bankLoan = false;
let buttonPayBackLoan;

function buttonTakeLoanPressed(){
 userInput = window.prompt("How much would you like to loan?");
 userInput = parseInt(userInput);

 if(userInput<(moneyInBank*2) && bankLoan == false && userInput > 0){
    alert("Loan successful");
 bankLoan = true;
 loanAmount = userInput;
 loanElement.innerText = loanAmount;

    if(buttonPayBackLoan == null){
     buttonPayBackLoan = document.createElement("button");
    buttonPayBackLoan.innerHTML = "Pay back loan";
    buttonPayBackLoanPosition.appendChild(buttonPayBackLoan);
    buttonPayBackLoan.addEventListener("click", buttonPayBackLoanPressed);
    }
    buttonPayBackLoan.style.visibility = "visible";
    buttonPayBackLoan.disabled =false;
    }
    else {
    alert("Loan unsuccessful")
    buttonPayBackLoan.disabled =true;
    buttonPayBackLoan.style.visibility = "hidden";

    }
};

function buttonPayBackLoanPressed(){
    if(moneyInWallet >= loanAmount){
    moneyInWallet -=loanAmount;
    loanAmount =0;
    moneyWalletElement.innerText = moneyInWallet;
    loanElement.innerText = loanAmount;
    bankLoan = false;
    buttonPayBackLoan.disabled =true;
    buttonPayBackLoan.style.visibility = "hidden";
    }
    else {
        loanAmount -=moneyInWallet;
        moneyInWallet = 0;
        moneyWalletElement.innerText = moneyInWallet;
        loanElement.innerText = loanAmount;
    }

}


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
            buttonPayBackLoan.disabled =true;
            buttonPayBackLoan.style.visibility = "hidden";
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
