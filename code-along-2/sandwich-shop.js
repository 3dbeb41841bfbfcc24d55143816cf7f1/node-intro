function orderSandwich(customer, description, duration, callback) {
  console.log('> ' + customer + ' ordered a ' + description);
  setTimeout(function() {
    console.log('- ' + customer + ', you\'re order is ready!');
    var sandwich = 'a delicious ' + description;
    callback(customer, sandwich);
  }, duration * 1000);
}

function enjoySandwich(customer, sandwich) {
  console.log('< ' + customer + ' is enjoying ' + sandwich);
}

orderSandwich('Jarrett', 'Roast Pork and Pickled Cucumber Sandwich', 4, enjoySandwich);
orderSandwich('Mike', 'Reuben on Rye', 2, enjoySandwich);
orderSandwich('Marc', 'Smoked Salmon Salad Sandwich', 6, enjoySandwich);
orderSandwich('Shawn', 'Apple Peanut Butter Sandwich', 1, enjoySandwich);
