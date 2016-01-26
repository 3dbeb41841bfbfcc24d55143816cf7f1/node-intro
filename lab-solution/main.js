var Car = require('./car').Car;

var porsche = new Car('Porsche', '911 Carrera S', 'red',  true);
var tesla   = new Car('Tesla',   'Model S',       'blue', false);

console.log('My favorite car is a ' + tesla + ',');
console.log('but I also like a ' + porsche + '.');

tesla.accelerate(60);
console.log("The Tesla is currently going " + tesla.speed + "mph.");

tesla.decelerate(20);
console.log("My Tesla is currently going " + tesla.speed + "mph.");
