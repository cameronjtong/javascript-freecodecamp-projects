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
  return formatChange(calculateChange());

  function calculateChange() {
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
    return { amountToReturn, availableCash, change };
  }

  function formatChange(data) {
    if (data.amountToReturn !== 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    if (isTillEmpty(data.availableCash)) {
      return { status: "CLOSED", change: cashInDrawer };
    }

    let result = Object.entries(data.change).reduce(
      (acc, [denomination, amountOfDenomination]) => {
        if (amountOfDenomination > 0) {
          acc.push([denomination, amountOfDenomination / 100]);
        }
        return acc;
      },
      []
    );
    return { status: "OPEN", change: result };
  }
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
