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
  return formatChange(calculateChange(price, cashGiven, cashInDrawer));
}

function calculateChange(price, cashGiven, cashInDrawer) {
  let amountToReturn = cashGiven * 100 - price * 100;
  let availableCash = calculateAvailableCash(cashInDrawer);
  let change = {};

  [...MONEY]
    .reverse()
    .filter(([, value]) => amountToReturn - value > 0)
    .forEach(([denomination, value]) => {
      change[denomination] = 0;
      while (availableCash[denomination] > 0 && amountToReturn - value >= 0) {
        availableCash[denomination] -= value;
        change[denomination] += value;
        amountToReturn -= value;
      }
    });
  return { amountToReturn, availableCash, change, cashInDrawer };
}

function formatChange(data) {
  if (data.amountToReturn !== 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (isTillEmpty(data.availableCash)) {
    return { status: "CLOSED", change: data.cashInDrawer };
  }

  return { status: "OPEN", change: format(data.change) };
}

function calculateAvailableCash(cashInDrawer) {
  return cashInDrawer.reduce((acc, [denomination, quantity]) => {
    acc[denomination] = quantity * 100;
    return acc;
  }, {});
}

function isTillEmpty(availableCash) {
  return !Object.keys(availableCash).find((type) => availableCash[type] > 0);
}

function format(change) {
  const amountIsPresent = (amountOfDenomination) => amountOfDenomination > 0;
  const convertAmountToDecimal = (amountOfDenomination) =>
    amountOfDenomination / 100;
  let result = pickBy(change, amountIsPresent);
  result = transformValues(result, convertAmountToDecimal);
  return toPairs(result);
}

function transformValues(object, callback) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[key] = callback(value);
    return acc;
  }, {});
}

function toPairs(object) {
  return Object.entries(object);
}

function pickBy(object, callback) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (callback(value)) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
