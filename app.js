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

// Initialize most of the variables needed in the assignment. 
// all code comments are related to the code above it

const buttonTakeLoanPressed = () => {
 userInput = window.prompt("How much would you like to loan?");
 userInput = parseInt(userInput);
 // ask the user how much the would like to loan and turns that into a number.
 if(userInput<(moneyInBank*2) && bankLoan == false && userInput > 0){
    alert("Loan successful");
 bankLoan = true;
 loanAmount = userInput;
 loanElement.innerText = loanAmount;
 moneyInBank += loanAmount;
 moneyBankElement.innerText = moneyInBank;
 //checks if the amount the user input is within the limits specified by the task.
 //also checks if they already have a loan or if the input is more than 0
 //if they input 0 it would produce unwanted results.
    if(buttonPayBackLoan == null){
     buttonPayBackLoan = document.createElement("button");
    buttonPayBackLoan.innerHTML = "Pay back loan";
    buttonPayBackLoanPosition.appendChild(buttonPayBackLoan);
    buttonPayBackLoan.addEventListener("click", buttonPayBackLoanPressed);
    }
// Checks if the pay back loan button is not already created, then proceeds to create it. 
// assigns the location to the button and create the event for when it is clicked
    buttonPayBackLoan.style.visibility = "visible";
    buttonPayBackLoan.disabled =false;
    }
//enables and shows the button when you take a loan
    else {
    alert("Loan unsuccessful")
    buttonPayBackLoan.disabled =true;
    buttonPayBackLoan.style.visibility = "hidden";
    }
// disables and hides the pay back loan button
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
// checks if you have more money or equal in you wallet, then subtracts the loan amount from the amount in the wallet
// make the loan amount 0 and makes the boolean false so the player can take another loan, lastly the numbers are updated.
//The pay back loan button is also disabled and hidden
    }
    else {
        loanAmount -=moneyInWallet;
        moneyInWallet = 0;
        moneyWalletElement.innerText = moneyInWallet;
        loanElement.innerText = loanAmount;
    }
// runs the else statement if the amount in the wallet is less than the loan
// subtracts the wallet amount from the loan amount and updates the numbers.
}


 const buttonWorkPressed = () => {
    moneyWalletElement.innerText = moneyInWallet +=100; 
};
//adds 100 to the wallet

const buttonMoneyToBankPressed = () => {
    if(bankLoan == true){
        moneyInBank += moneyInWallet-(moneyInWallet/10);
        loanAmount -=(moneyInWallet/10)
        moneyInWallet = 0;
//checks if the user has an oustanding loan and proceed to take 10% of the money sent from the wallet to the bank to down pay the loan
        if (loanAmount <= 0){
            moneyInBank -=loanAmount;
            loanAmount = 0;
            bankLoan = false;
            buttonPayBackLoan.disabled =true;
            buttonPayBackLoan.style.visibility = "hidden";
// checks if the total loan amount is paid back. 
//if it is all paid back it will take a negativ value that loan amount has gotten and add it to the amount in the bank
//So if the player ended up paying back more than the loan was originally worth then he will be refunded the extra money he spent
//lastly the button is disabled and hidden and the boolean turn false, so he can take a new loan
        };
        moneyBankElement.innerText = moneyInBank;
        moneyWalletElement.innerText = moneyInWallet;
        loanElement.innerText = loanAmount;
//updated the number after the money is tranfered from wallet to bank
    }
    else{
        moneyInBank += moneyInWallet;
        moneyInWallet = 0;
        moneyBankElement.innerText = moneyInBank;
        moneyWalletElement.innerText = moneyInWallet;
    }
// if there is no loan it will simply just add the wallet to the bank and make the wallet amount 0
// then update the numbers
};

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(Response => Response.json())
    .then(information => computers = information)
    .then(computers => addComputersToSelecter(computers))
//fetching information from the link

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
//cycles through the computers and adds them to the addcomputersoselecter() function and displays the information for the first computer on when it starts
const addComputerToSelecter = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    selectComputer.appendChild(computerElement);    
}
// Add the computer information and makes the list

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
//displays the information for the different computers. Also checks if the selected computer has the index number 4 
//and correctly displays it picture

const buyComputer = () => {
    const selectedComputer = computers[selectComputer.selectedIndex]
    if (selectedComputer.price < moneyInBank && selectedComputer.stock >0){
        moneyInBank -= selectedComputer.price;
        moneyBankElement.innerText = moneyInBank;
        alert("You successfully bought the " + selectedComputer.title+"!");
        stockElement.innerText = selectedComputer.stock -=1;
//checks if you have enough money in the bank to purchase the selected computer and if there is enough stock
// updates the amount of money you have in the bank and updates the stock amount
// lastly it alerts the user he has sucessfully purchased the computer

        if(selectedComputer.stock <=0){
            selectedComputer.active = false;
            activeElement.innerText = selectedComputer.active
        }  
        //checks if the stock is 0 or less then changes the active status to false.
    }
    else if (selectedComputer.stock <=0){
        alert("There is no " + selectedComputer.title + " in stock!")
    }
    // checks if the user is trying to purchase a computer with 0 stock and alerts the user that there is none in stock
    else {
        alert("You do not have enough money in the bank to complete this transaction");
    }
    //if the user can't afford the computer it alerts and tells them that they could not complete the transaction
}


buttonTakeLoan.addEventListener("click", buttonTakeLoanPressed);
buttonWork.addEventListener("click", buttonWorkPressed);
buttonMoneyToBank.addEventListener("click", buttonMoneyToBankPressed);
selectComputer.addEventListener("change",computerMenuChange);
buttonBuyComputer.addEventListener("click",buyComputer);
// make event listeners for many buttons.