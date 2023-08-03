// // CASH REGISTER APP

// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// The checkCashRegister() function should always return an object with a status key and a change key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.


const LOOKUP = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  TEN: 1000,
  TWENTY: 2000,
  "ONE HUNDRED": 10000
}

function checkCashRegister(price, cash, cid) {
  // store variable with the amount change due.
  const changeDue = cash - price;
  let changeDueCents =  changeDue * 100;
  // console.log(changeDue);


  // sum up all the money in the cash drawer
  const available = cid.reduce((acc, billType) =>{
    return acc + billType[1] * 100; // conversion to cents
   
  }, 0);
  //  if the money in the cid is equal to change due. return
  //   {status: "CLOSED", change: [...]}
   if(available === changeDueCents){
     return {status: "CLOSED", change: cid};
   }
   //reverse the cid, loop through with a map and add up for each bill type, the amount of money needed for that billtype.
  const change = cid.reverse().map(([name, amount])  => {
// loop while the change due is more than the value on the bill type and the amount of money on that bill type is sufficient.
let total = 0;
const nameValue = LOOKUP[name];
let amountCents = amount * 100;
while(nameValue <= changeDueCents && amountCents > 0){
  // add one bills worth to the total
  total += nameValue;


  //subtract that nameValue from the total
  changeDueCents -= nameValue;

  // subtract that nameValue from how much of that billtype is available.
  amountCents -= nameValue;
}
return [name, total/100];

// filter out compartments that are bigger than 0.
  }).filter(([, amount]) => amount > 0);
  const changeTotal = change.reduce((acc, [, amount]) => {
    return acc + amount;

  }, 0.00);
  if (changeTotal < changeDue){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  return {status: "OPEN", change: change}



  
  
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);