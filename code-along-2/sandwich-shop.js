function showMsg(who, item, action) {
  var returnMsg;
  switch (action) {
  case "order":
    returnMsg = "> " + who + " ordered a " + item + ".";
    break;
  case "ready":
    returnMsg = "- " + who + ", your " + item + " is ready!";
    break;
  case "eating":
    returnMsg = "< " + who + " is enjoying " + item + ".";
    break;
  }
  console.log(returnMsg);
  return returnMsg;
}

function orderSandwich(customer, item, duration) {
  // print the Ordered message
  showMsg(customer, item, "order");

  setTimeout(function() {
    // print the Ready message
    showMsg(customer, item, "ready");

    var deliciousItem = 'a delicious ' + item;
    // print the Enjoy message
    showMsg(customer, deliciousItem, "eating");
  }, duration * 1000);
}

orderSandwich('Jarrett', 'Roast Pork and Pickled Cucumber Sandwich', 4);
orderSandwich('Mike', 'Reuben on Rye', 2);
orderSandwich('Marc', 'Smoked Salmon Salad Sandwich', 6);
orderSandwich('Shawn', 'Apple Peanut Butter Sandwich', 1);
