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

export default function checkCashRegister(price, cash, cashInDrawer) {
  let returnAmt = cash * 100 - price * 100;
  let availableCash = calculateAvailableCash(cashInDrawer);
  let change = {};

  [...MONEY].reverse().forEach(([denomination, value]) => {
    if (returnAmt - value > 0) {
      change[denomination] = 0;
      while (availableCash[denomination] > 0 && returnAmt - value >= 0) {
        availableCash[denomination] -= value;
        change[denomination] += value;
        returnAmt -= value;
      }
    }
  });

  if (returnAmt !== 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (isRegisterClosed(availableCash)) {
    return { status: "CLOSED", change: cashInDrawer };
  }

  let result = [];
  Object.keys(change).map((type) => {
    if (change[type] > 0) {
      result.push([type, change[type] / 100]);
    }
  });
  return { status: "OPEN", change: result };
}

function calculateAvailableCash(cashInDrawer) {
  let result = {};
  cashInDrawer.forEach(([denomination, quantity]) => {
    result[denomination] = quantity * 100;
  });
  return result;
}

function isRegisterClosed(availableCash) {
  let result = true;
  Object.keys(availableCash).forEach((type) => {
    if (availableCash[type] > 0) {
      result = false;
    }
  });
  return result;
}
