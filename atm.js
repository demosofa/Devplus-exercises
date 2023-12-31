const K500_QUANTITY = 2;
const K200_QUANTITY = 5;
const K100_QUANTITY = 10;
const K50_QUANTITY = 100;

const K500_VALUE = 500000;
const K200_VALUE = 200000;
const K100_VALUE = 100000;
const K50_VALUE = 50000;

const BASE_UNIT = 50000;

function calculate(amount, lstCheck, result, valid = false) {
  let { value, left } = lstCheck[0];
  let loop = Math.floor(amount / value);
  if (loop > 0 && loop <= left) {
    amount -= value * loop;
    result["k" + value / 1000] = loop;
  }
  // if (amount % value == 0) valid = true;
  if (amount == 0) return result;
  else if (lstCheck.length - 1)
    return calculate(amount, lstCheck.slice(1), result, valid);
  // else if (valid) return "Invalid balance";
  else return null;
}

function withdraw(amount, lstCheck, baseUnit) {
  if (amount % baseUnit != 0) return "Invalid balance";
  lstCheck = lstCheck.sort((a, b) => b.value - a.value);
  let init = lstCheck.reduce((prev, curr) => {
    prev["k" + curr.value / 1000] = 0;
    return prev;
  }, {});
  let result;
  for (let i = 0; i < lstCheck.length; i++) {
    result = calculate(amount, lstCheck.slice(i), init);
    // if (result && typeof result == "object") return result;
    if (result) return result;
  }
  // if (result) return result;
  return "Insufficient balance from ATM";
}

console.log(
  withdraw(
    65000,
    [
      { value: K500_VALUE, left: K500_QUANTITY },
      { value: K200_VALUE, left: K200_QUANTITY },
      { value: K100_VALUE, left: K100_QUANTITY },
      { value: K50_VALUE, left: K50_QUANTITY },
    ],
    BASE_UNIT
  )
);
