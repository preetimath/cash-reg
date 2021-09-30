const billAmount = document.querySelector("#bill-amount");
const errMessage = document.querySelector("#err-message");
const nextButton = document.querySelector("#next-button");
const showNext = document.querySelector("#show-next");
const cashGiven = document.querySelector("#cash-given");
const checkButton = document.querySelector("#check-button");
const clearButton = document.querySelector("#clear-button");
const message = document.querySelector("#error-message");
const noOfNotes = document.querySelectorAll(".no-of-notes");

const availableNotes = [2000, 500, 100, 20, 10, 5, 1];

showNext.style.display = "none";
document.getElementById("bill-amount").focus();

nextButton.addEventListener("click", function displayNext() {
    //const checkValue = Number(billAmount.value);
    // console.log(typeof checkValue);
    // if (typeof checkValue != "number") {
    //     console.log("number--");
    //     showNext.style.display = "block";
    // }
    // else {
    //     console.log("string--");
    // }

    if (isNaN(billAmount.value) || billAmount.value == "") 
    {
        errMessage.style.display = "block";
        errMessage.innerText = "Please Provide Numbers";
        //alert("Must input numbers");
        console.log("not a number--");
        document.getElementById("bill-amount").focus();
        return false;
    } else {
        console.log("number--");
        errMessage.style.display = "none";
        showNext.style.display = "block";
        document.getElementById("cash-given").focus();
    }
});

checkButton.addEventListener("click", function validateBillAndCashAmount() {
    hideMessage();    
    if (billAmount.value > 0) { // 12
        if (cashGiven.value >= billAmount.value) { // 2022 > 12 => true
            const amountToBeReturned = cashGiven.value - billAmount.value; // 2022 - 12 = 2010
            calculateChange(amountToBeReturned);
        } else {
            showMessage("The cash provided should atleast be equal to the bill amount");
        }
    } else {
        showMessage("Invalid Bill Amount");
    }
});

clearButton.addEventListener("click", function clearInputs() {
    billAmount.value = "";
    cashGiven.value = "";
    for(let i = 0; i < noOfNotes.length; i++){
        noOfNotes[i].innerText = "";
    }
    document.getElementById("bill-amount").focus();
    showNext.style.display = "none";
});

function calculateChange(amountToBeReturned){ // 2010
    // go over all the available notes
    for(let i = 0; i < availableNotes.length; i++){

        // no of notes need for the denomination
        const numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]); // 2010 / 2000 = 1 || 10 / 500 = 0

        // amount left after calculating the number of notes needed
        amountToBeReturned = amountToBeReturned % availableNotes[i]; // 2010 % 2000 = 10 || 10 % 500 = 10

        // updating the no of notes in the table for the current amount
        noOfNotes[i].innerText = numberOfNotes; // 1 || 0 
    }
}

function hideMessage(){
    message.style.display = "none";
}

function showMessage(msg) {    
    message.style.display = "block";
    message.innerText = msg;
}