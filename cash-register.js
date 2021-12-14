const MONEY = [
  ["PENNY", 1],
  ["NICKEL", 5],
  ["DIME", 10],
  ["QUARTER", 25],
  ["ONE", 100],
  ["FIVE", 500],
  ["TEN", 1000],
  ["TWENTY", 2000],
  ["ONE HUNDRED", 10000],
];

function checkCashRegister(price, cash, cid) {
  let returnAmt = cash * 100 - price * 100;
  let availableCash = {};
  let change = {};

  cid.forEach((element) => {
    availableCash[element[0]] = element[1] * 100;
  });

  let index = MONEY.length - 1;
  // Iterate from highest money type to lowest
  while (index >= 0 && returnAmt > 0) {
    let value = MONEY[index][1];
    let name = MONEY[index][0];

    if (returnAmt - value > 0) {
      change[name] = 0;
      while (availableCash[name] > 0 && returnAmt - value >= 0) {
        availableCash[name] -= value;
        change[name] += value;
        returnAmt -= value;
      }
    }
    index -= 1;
  }
  if (returnAmt === 0) {
    let registerEmpty = true;
    // if we have any money left in the register this must be set to false
    Object.keys(availableCash).forEach((type) => {
      if (availableCash[type] > 0) {
        registerEmpty = false;
      }
    });
    if (registerEmpty) {
      return { status: "CLOSED", change: cid };
    } else {
      let result = [];
      Object.keys(change).map((type) => {
        if (change[type] > 0) {
          result.push([type, change[type] / 100]);
        }
      });
      return { status: "OPEN", change: result };
    }
  }
  // default case
  return { status: "INSUFFICIENT_FUNDS", change: [] };
}
