'use strict';

function printReceipt(inputs){
  let purchaseSequence = getPurchaseSequence(inputs);
  let itemGroups = groupItems(inputs);
  let receiptView = buildReceiptString(itemGroups, purchaseSequence);
  displayReceiptView(receiptView);
}

function getPurchaseSequence(items){
  return items.map(item => {
    return item.barcode;
  }).filter((barcode, index, barcodes) => {
    return (barcodes.indexOf(barcode) === index);
  });
}

function groupItems(items){
  let itemGroups = {};
  items.forEach(item => {
    itemGroups[item.barcode] = itemGroups[item.barcode] || [];
    itemGroups[item.barcode].push(item);
  });
  return itemGroups;
}

function buildReceiptString(itemGroups, purchaseSequence){
  const FIXEDDIGIT = 2;
  let template = `***<没钱赚商店>收据***
${purchaseSequence.map(barcode => {
  return `名称：${itemGroups[barcode][0].name}，数量：${itemGroups[barcode].length}${itemGroups[barcode][0].unit}，单价：${itemGroups[barcode][0].price.toFixed(FIXEDDIGIT)}(元)，小计：${computeSubTotal(itemGroups[barcode]).toFixed(FIXEDDIGIT)}(元)`;
}).join(`
`)}
----------------------
总计：${computeTotal(itemGroups).toFixed(FIXEDDIGIT)}(元)
**********************`;
  return template;
}

function computeSubTotal(items){
  if(items.length < 1){
    return 0;
  }
  return (items[0].price * items.length);
}

function objectToArray(object){
  let array = [];
  Object.keys(object).map(function(key, _) {
    array.push(object[key]);
  });
  return array;
}

function computeTotal(itemGroups){
  return objectToArray(itemGroups).reduce((acc, items) => {
    return acc + computeSubTotal(items);
  }, 0);
}

function displayReceiptView(receiptString){
  console.log(receiptString);
}