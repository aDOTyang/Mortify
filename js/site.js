function Mortify() {
  displayMonthly();
  calcBotMortgage();
}

// pulls info from input form
function pullMortify() {
  let loanAmt = document.getElementById("loanAmt").value;
  let loanTerm = document.getElementById("loanTerm").value;
  let intRate = document.getElementById("intRate").value;

  let mortArray = [];

  if (loanAmt !== NaN && loanTerm !== NaN && intRate !== NaN) {
    parseInt(loanAmt, 10);
    parseInt(loanTerm, 10);
    parseFloat(intRate);
    mortArray.push(loanAmt, loanTerm, intRate);
    return mortArray;
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please only enter numbers.",
    });
  }
}

// calculates total monthly payment
function calcTopMortgage(mortArray) {
  mortArray = pullMortify(mortArray);

  let remBalance = mortArray[0]; // remBalance starts at full loan amount (no payments)
  let sumInterest = 0; // ensures sumInterest value not carried over
  let principalAmt = 0; // ensures principalAmt value not carried over
  let intAnnual = mortArray[2] / 1200; // converts intRate input to annual interest rate
  let topArray = [];

  // calculates the total monthly payment amount
  let monthlyAmt =
    (mortArray[0] * intAnnual) /
    (1 - Math.pow(1 + intAnnual, -1 * mortArray[1]));

  // calculates remaining balance, interest & principal payments
  for (i = 0; i < mortArray[1]; i++) {
    monthNum = i + 1; // establishes monthly count
    interestAmt = remBalance * intAnnual; // calculate interest payment
    sumInterest += interestAmt; // sums the running interest paid
    principalAmt = monthlyAmt - interestAmt; // calculates principal payment
    remBalance = Math.abs(remBalance - principalAmt); // calculate remaining balance total
  }

  totalCost = Number(mortArray[0]) + Number(sumInterest);

  // top level display only
  topArray.push(monthlyAmt);
  topArray.push(sumInterest);
  topArray.push(totalCost);

  return topArray;
}

// displayMonthly(monthlyAmt, loanAmt, sumInterest, totalPrincipal);
function displayMonthly() {
  let mortArray = pullMortify();
  let topArray = calcTopMortgage();

  document.getElementById("monPayment").innerHTML = topArray[0].toLocaleString(
    "en-us",
    { style: "currency", currency: "USD" }
  );

  document.getElementById("totalPrincipal").innerHTML =
    mortArray[0].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

  sumInterest = document.getElementById("totalInterest").innerHTML =
    topArray[1].toLocaleString("en-us", { style: "currency", currency: "USD" });

  document.getElementById("totalCost").innerHTML = topArray[2].toLocaleString(
    "en-us",
    { style: "currency", currency: "USD" }
  );
}

// calculates total monthly payment
function calcBotMortgage(mortArray) {
  mortArray = pullMortify(mortArray);

  let remBalance = mortArray[0]; // remBalance starts at full loan amount (no payments)
  let sumInterest = 0; // ensures sumInterest value not carried over
  let principalAmt = 0; // ensures principalAmt value not carried over
  let intAnnual = mortArray[2] / 1200; // converts intRate input to annual interest rate

  const template = document.getElementById("mortify-template");

  const mortifyTable = document.getElementById("mortifyTable");
  mortifyTable.innerHTML = "";

  // calculates the total monthly payment amount
  let monthlyAmt =
    (mortArray[0] * intAnnual) /
    (1 - Math.pow(1 + intAnnual, -1 * mortArray[1]));

  // calculates remaining balance, interest & principal payments
  for (i = 0; i < mortArray[1]; i++) {
    monthNum = i + 1; // establishes monthly count
    interestAmt = remBalance * intAnnual; // calculate interest payment
    sumInterest += interestAmt; // sums the running interest paid
    principalAmt = monthlyAmt - interestAmt; // calculates principal payment
    remBalance = Math.abs(remBalance - principalAmt); // calculate remaining balance total

    let mortArray = [];
    mortArray.push(
      monthNum,
      principalAmt,
      interestAmt,
      sumInterest,
      remBalance
    );

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
}
