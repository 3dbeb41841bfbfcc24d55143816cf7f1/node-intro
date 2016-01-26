// main.js

// here we're grabbing everything that's "exported" in our other file, and storing it a variable called 'my'
var my = require('./my-module');

// Variables and such that were not exported aren't in scope
console.log("number is " + typeof number); // undefined

// Anything exported can be accessed on the object
console.log("Fruit is: ", my.fruit);

// Closures are still closures
console.log("The number is: " + my.getNumber());

// JavaScript is still JavaScript
console.log("The array contains " + my.arr.length + " elements");

// Let's see the module we imported
console.log(my);
