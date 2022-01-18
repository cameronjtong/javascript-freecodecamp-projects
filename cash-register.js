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

export default function checkCashRegister(price, cashGiven, cashInDrawer) {
  let amountToReturn = cashGiven * 100 - price * 100;
  let availableCash = calculateAvailableCash(cashInDrawer);
  let change = {};

  [...MONEY].reverse().forEach(([denomination, value]) => {
    if (amountToReturn - value > 0) {
      change[denomination] = 0;
      while (availableCash[denomination] > 0 && amountToReturn - value >= 0) {
        availableCash[denomination] -= value;
        change[denomination] += value;
        amountToReturn -= value;
      }
    }
  });

  if (amountToReturn !== 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (isRegisterClosed(availableCash)) {
    return { status: "CLOSED", change: cashInDrawer };
  }

  let result = [];
  Object.entries(change).map(([denomination, amountOfDenomination]) => {
    if (amountOfDenomination > 0) {
      result.push([denomination, amountOfDenomination / 100]);
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
