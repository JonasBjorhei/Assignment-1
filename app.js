const buttonWork = document.getElementById("work");
const buttonMoneyToBank = document.getElementById("moneyToBank");
const buttonBuyComputer = document.getElementById("buyComputer");
const buttonTakeLoan = document.getElementById("takeLoan");
const selectComputer = document.getElementById("computer");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const specsElement = document.getElementById("specs");
const priceElement = document.getElementById("price");
const stockElement = document.getElementById("stock");
const activeElement = document.getElementById("active");
const imageElement = document.getElementById("image");
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
let computers = [];

const buttonTakeLoanPressed = () => {
 userInput = window.prompt("How much would you like to loan?");
 userInput = parseInt(userInput);

 if(userInput<(moneyInBank*2) && bankLoan == false && userInput > 0){
    alert("Loan successful");
 bankLoan = true;
 loanAmount = userInput;
 loanElement.innerText = loanAmount;
 moneyInBank += loanAmount;
 moneyBankElement.innerText = moneyInBank;

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

const buttonPayBackLoanPressed = () =>{
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


 const buttonWorkPressed = () => {
    moneyWalletElement.innerText = moneyInWallet +=100; 
};

const buttonMoneyToBankPressed = () => {
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

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(Response => Response.json())
    .then(information => computers = information)
    .then(computers => addComputersToSelecter(computers))


const addComputersToSelecter = (computers) => {
    computers.forEach(x => addComputerToSelecter(x));
    titleElement.innerText = computers[0].title;
    descriptionElement.innerText = computers[0].description;
    specsElement.innerText = computers[0].specs;
    priceElement.innerText = computers[0].price;
    stockElement.innerText = computers[0].stock;
    activeElement.innerText = computers[0].active;
    imageElement.src = "https://hickory-quilled-actress.glitch.me/assets/images/1.png"
}
const addComputerToSelecter = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    selectComputer.appendChild(computerElement);    
}

const computerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    titleElement.innerText = selectedComputer.title;
    descriptionElement.innerText = selectedComputer.description;
    specsElement.innerText = selectedComputer.specs;
    priceElement.innerText = selectedComputer.price;
    stockElement.innerText = selectedComputer.stock;
    activeElement.innerText = selectedComputer.active;
    if (selectComputer.selectedIndex == 4){
        imageElement.src = "https://hickory-quilled-actress.glitch.me/assets/images/5.png"
    }
    else{
    imageElement.src = "https://hickory-quilled-actress.glitch.me/" + selectedComputer.image;
    }
}

const buyComputer = () => {
    const selectedComputer = computers[selectComputer.selectedIndex]
    if (selectedComputer.price < moneyInBank && selectedComputer.stock >0){
        moneyInBank -= selectedComputer.price;
        moneyBankElement.innerText = moneyInBank;
        alert("You successfully bought the " + selectedComputer.title+"!");
        stockElement.innerText = selectedComputer.stock -=1;
        if(selectedComputer.stock <=0){
            selectedComputer.active = false;
            activeElement.innerText = selectedComputer.active
        }  
    }
    else if (selectedComputer.stock <=0){
        alert("There is no " + selectedComputer.title + " in stock!")
    }
    else {
        alert("You do not have enough money in the bank to complete this transaction");
    }
}

buttonTakeLoan.addEventListener("click", buttonTakeLoanPressed);
buttonWork.addEventListener("click", buttonWorkPressed);
buttonMoneyToBank.addEventListener("click", buttonMoneyToBankPressed);
selectComputer.addEventListener("change",computerMenuChange);
buttonBuyComputer.addEventListener("click",buyComputer);