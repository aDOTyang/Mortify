function mortify() {
  let formInput = pullMortify();
  formInput.innerHTML = "";

  calcMortgage();
  displayMonthly();
  displayMortgage();
}

// pulls info from input form
function pullMortify() {
  let mortArray = [];

  let loanAmt = document.getElementById("loanAmt").value;
  let loanTerm = document.getElementById("loanTerm").value;
  let intRate = document.getElementById("intRate").value;

  mortArray.push(loanAmt);
  mortArray.push(loanTerm);
  mortArray.push(intRate);

  return mortArray;
}

// calculates total monthly payment
function calcMortgage(mortArray) {
  pullMortify();

  let loanAmt = mortArray[0];
  let loanTerm = mortArray[1];
  let intRate = mortArray[2] / 100;

  // calculates the total monthly payment amount
  let monthlyAmt =
    (loanAmt * (intRate / 1200)) /
    (1 - (1 + intRate / 100 / 1200) ** -loanTerm);

  // calculates remaining balance, interest & principal payments
  let remBalance = loanAmt; // remBalance starts at full loan amount (no payments)
  let sumInterest = 0; // ensures sumInterest begins at 0

  for (i = 1; i < loanTerm; i++)
    if (loanAmt > remBalance) {
      interestAmt = remainingBal * (intRate / 1200); // calculate interest payment
      sumInterest += sumInterest + interestAmt; // sums the running interest paid
      principalAmt = monthlyAmt - interestAmt; // calculates principal payment
      remBalance = remBalance - principalAmt; // calculate remaining balance total
    } else {
      return remBalance;
    }

  return i, monthlyAmt, principalAmt, interestAmt, sumInterest, remBalance;
}

function displayMonthly() {
  pullMortify();
  /*   let totalPrincipal = 0;
  let totalInterest = 0;
  let totalCost = 0; */
  /* 
  let monthlyAmt = calcMonthly(mortArray);
  document.getElementById("monPayment").innerHTML = monthlyAmt; */

  totalPrincipal = loanAmt;
  document.getElementById("totalPrincipal").innerHTML =
    totalPrincipal.value.toLocaleString();

  document.getElementById("totalInterest").innerHTML =
    sumInterest.value.toLocaleString();

  totalCost = totalPrincipal + totalInterest;
  document.getElementById("totalCost").innerHTML =
    totalCost.value.toLocaleString();
}

/* function displayMortgage() {
  pullMortify();
  // pulls template from template tag
  const template = document.getElementById("mortify-template");
  // tells HTML where to write template insertion
  const mortifyTable = document.getElementById("mortifyTable");
  mortifyTable.innerHTML = "";
  // sets inputRow equal to template layout for formatting

  for (let i = 0; i < array.length; i++) {
    const inputRow = document.importNode(template.content, true);

    let inputCol = inputRow.querySelectorAll("td");
    inputCol[0].textContent = inputMortify[i].loanAmt;
    inputCol[1].textContent = inputMortify[i].loanTerm;
    inputCol[2].textContent = inputMortify[i].intRate;
    inputCol[3].textContent = inputMortify[i].attendance;
  }
} */
