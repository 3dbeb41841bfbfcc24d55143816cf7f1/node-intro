function Car(make, model, color, convertible) {
  this.make = make;
  this.model = model;
  this.color = color;
  this.convertible = convertible;
  this.speed = 0;
}

Car.prototype.accelerate = function(mph) {
  this.speed += mph;
}

Car.prototype.decelerate = function(mph) {
  this.speed -= mph;
}

Car.prototype.toString = function() {
  return this.color + ' ' + this.make + ' ' + this.model;
}

module.exports.Car = Car;
