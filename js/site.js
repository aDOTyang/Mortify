function Mortify() {
  displayMonthly();
  calcBotMortgage();
}

// pulls info from input form
/* function pullMortify() {
  let loanAmt = parseInt(document.getElementById("loanAmt").value, 10);
  let loanTerm = parseInt(document.getElementById("loanTerm").value, 10);
  let intRate = parseFloat(document.getElementById("intRate").value);

  return loanAmt, loanTerm, intRate;
} */

// calculates total monthly payment
function calcTopMortgage() {
  let loanAmt = parseInt(document.getElementById("loanAmt").value, 10);
  let loanTerm = parseInt(document.getElementById("loanTerm").value, 10);
  let intRate = parseFloat(document.getElementById("intRate").value);

  let remBalance = loanAmt; // remBalance starts at full loan amount (no payments)
  let sumInterest = 0; // ensures sumInterest value not carried over
  let principalAmt = 0; // ensures principalAmt value not carried over
  let intAnnual = intRate / 1200; // converts intRate input to annual interest rate
  let topArray = [];

  // calculates the total monthly payment amount
  let monthlyAmt =
    (loanAmt * intAnnual) / (1 - Math.pow(1 + intAnnual, -1 * loanTerm));

  // calculates remaining balance, interest & principal payments
  for (i = 0; i < loanTerm; i++) {
    monthNum = i + 1; // establishes monthly count
    interestAmt = remBalance * intAnnual; // calculate interest payment
    sumInterest += interestAmt; // sums the running interest paid
    principalAmt = monthlyAmt - interestAmt; // calculates principal payment
    remBalance = remBalance - principalAmt; // calculate remaining balance total
  }

  // top level display only - hard coded values
  topArray["monthNum"] = monthNum;
  topArray["monthlyAmt"] = monthlyAmt;
  topArray["principalAmt"] = principalAmt;
  topArray["interestAmt"] = interestAmt;
  topArray["sumInterest"] = sumInterest;
  topArray["remBalance"] = remBalance;
  topArray["loanAmt"] = loanAmt;
  topArray["loanTerm"] = loanTerm;
  topArray["totalCost"] = loanAmt + sumInterest;

  return topArray;
}

// displayMonthly(monthlyAmt, loanAmt, sumInterest, totalPrincipal);
function displayMonthly() {
  let mortData = calcTopMortgage();

  document.getElementById("monPayment").innerHTML = mortData[
    "monthlyAmt"
  ].toLocaleString("en-us", { style: "currency", currency: "USD" });

  document.getElementById("totalPrincipal").innerHTML = mortData[
    "loanAmt"
  ].toLocaleString("en-us", { style: "currency", currency: "USD" });

  sumInterest = document.getElementById("totalInterest").innerHTML = mortData[
    "sumInterest"
  ].toLocaleString("en-us", { style: "currency", currency: "USD" });

  document.getElementById("totalCost").innerHTML = mortData[
    "totalCost"
  ].toLocaleString("en-us", { style: "currency", currency: "USD" });
}

// calculates total monthly payment
function calcBotMortgage() {
  let loanAmt = parseInt(document.getElementById("loanAmt").value, 10);
  let loanTerm = parseInt(document.getElementById("loanTerm").value, 10);
  let intRate = parseFloat(document.getElementById("intRate").value);

  let remBalance = loanAmt; // remBalance starts at full loan amount (no payments)
  let sumInterest = 0; // ensures sumInterest value not carried over
  let principalAmt = 0; // ensures principalAmt value not carried over
  let intAnnual = intRate / 1200; // converts intRate input to annual interest rate

  const template = document.getElementById("mortify-template");

  const mortifyTable = document.getElementById("mortifyTable");
  mortifyTable.innerHTML = "";

  // calculates the total monthly payment amount
  let monthlyAmt =
    (loanAmt * intAnnual) / (1 - Math.pow(1 + intAnnual, -1 * loanTerm));

  // calculates remaining balance, interest & principal payments
  for (i = 0; i < loanTerm; i++) {
    monthNum = i + 1; // establishes monthly count
    interestAmt = remBalance * intAnnual; // calculate interest payment
    sumInterest += interestAmt; // sums the running interest paid
    principalAmt = monthlyAmt - interestAmt; // calculates principal payment
    remBalance = Math.abs(remBalance - principalAmt); // calculate remaining balance total

    let mortArray = [];
    mortArray.push(monthNum);
    mortArray.push(principalAmt);
    mortArray.push(interestAmt);
    mortArray.push(sumInterest);
    mortArray.push(remBalance);

    let inputRow = document.importNode(template.content, true);
    let inputCol = inputRow.querySelectorAll("td");

    inputCol[0].textContent = mortArray[0];
    inputCol[1].textContent = monthlyAmt.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[2].textContent = mortArray[1].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[3].textContent = mortArray[2].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[4].textContent = mortArray[3].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[5].textContent = mortArray[4].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

    mortifyTable.appendChild(inputRow);
  }
  return mortArray;
}
