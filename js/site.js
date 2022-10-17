function Mortify() {
  /* let formInput = pullMortify();
  formInput.innerHTML = ""; */

  displayMonthly();
  displayMortgage();
}

// pulls info from input form
/* function pullMortify() {
  let loanAmt = parseInt(document.getElementById("loanAmt").value, 10);
  let loanTerm = parseInt(document.getElementById("loanTerm").value, 10);
  let intRate = parseFloat(document.getElementById("intRate").value);

  return loanAmt, loanTerm, intRate;
} */

// calculates total monthly payment
function calcMortgage() {
  let loanAmt = parseInt(document.getElementById("loanAmt").value, 10);
  let loanTerm = parseInt(document.getElementById("loanTerm").value, 10);
  let intRate = parseFloat(document.getElementById("intRate").value);
  /* let monthNumArr = [];
  let principalAmtArr = [];
  let interestAmtArr = [];
  let sumInterestArr = [];
  let remBalanceArr = []; */
  let mortObj = {
    monthNumArr: [],
    principalAmtArr: [],
    sumInterestArr: [],
    remBalanceArr: [],
  };

  let remBalance = loanAmt; // remBalance starts at full loan amount (no payments)
  let sumInterest = 0; // ensures sumInterest value not carried over
  let principalAmt = 0; // ensures principalAmt value not carried over
  let intAnnual = intRate / 1200;

  // calculates the total monthly payment amount
  let monthlyAmt =
    (loanAmt * intAnnual) / (1 - Math.pow(1 + intAnnual, -1 * loanTerm));

  // calculates remaining balance, interest & principal payments
  for (i = 1; i <= loanTerm; i++) {
    monthNum = i; // establishes monthly count
    interestAmt = remBalance * intAnnual; // calculate interest payment
    sumInterest += interestAmt; // sums the running interest paid
    principalAmt = monthlyAmt - interestAmt; // calculates principal payment
    remBalance = remBalance - principalAmt; // calculate remaining balance total

    mortObj.monthNumArr.push(monthNum);
    mortObj.principalAmtArr.push(principalAmt);
    /*   mortObj.interestAmtArr.push(interestAmt); */
    mortObj.sumInterestArr.push(sumInterest);
    mortObj.remBalanceArr.push(remBalance);

    mortObj["monthNum"] = monthNum;
    mortObj["monthlyAmt"] = monthlyAmt;
    mortObj["principalAmt"] = principalAmt;
    mortObj["interestAmt"] = interestAmt;
    mortObj["sumInterest"] = sumInterest;
    mortObj["remBalance"] = remBalance;
  }

  /* mortObj.push(monthNumArr); */
  mortObj["loanAmt"] = loanAmt;
  mortObj["loanTerm"] = loanTerm;
  mortObj["totalCost"] = loanAmt + sumInterest;

  return mortObj;
}

// displayMonthly(monthlyAmt, loanAmt, sumInterest, totalPrincipal);
function displayMonthly() {
  let mortData = calcMortgage();

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

function displayMortgage(mortObj) {
  // pulls template from template tag
  const template = document.getElementById("mortify-template");
  // tells HTML where to write template insertion
  const mortifyTable = document.getElementById("mortifyTable");
  mortifyTable.innerHTML = "";

  /* let monthNumArr = [];
  let principalAmtArr = [];
  let interestAmtArr = [];
  let sumInterestArr = [];
  let remBalanceArr = [];
 */
  let mortData = calcMortgage(
    monthNumArr,
    principalAmtArr,
    interestAmtArr,
    sumInterestArr,
    remBalanceArr
  );

  // sets inputRow equal to template layout for formatting
  const inputRow = document.importNode(template.content, true);
  for (i = 0; i < loanTerm; i++) {
    let inputCol = inputRow.querySelectorAll("td");

    inputCol[0].textContent = monthNumArr[i];
    inputCol[1].textContent = mortData["monthlyAmt"].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[2].textContent = principalAmtArr[i].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[3].textContent = interestAmtArr[i].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[4].textContent = sumInterestArr[i].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    inputCol[5].textContent = remBalanceArr[i].toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

    mortifyTable.appendChild(inputRow);
  }
}
