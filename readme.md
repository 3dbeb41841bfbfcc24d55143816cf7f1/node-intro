    ---
    title: Intro to Node.js
    type: Lesson
    duration: "1:25"
    creator:
        name: Micah Rich
        city: LA
    contributors:
        name: Emily Reese
        city: Atlanta
    competencies: Server Applications
    ---

# Intro to Node.js

## Objectives
- Explain what Node.js is & why it exists
- Compare and contrast Node/Express vs. Ruby/Sinatra/Rails
- Use module.exports and require to organize code

## Preparation
- Write basic Javascript
- Understand backend vs. front-end
- Have written a Rails or Sinatra application

## What is Node.js? - Intro (20 mins)

The makers of _Node.js_ took JavaScript (which normally only runs in the browser) and made it available in your computer (on the server side). They took Google's _V8_ JavaScript Engine and gave it the ability to execute JavaScript programs outside of a browser.

Keep in mind, _Node.js_ is strictly a tool to run JavaScript on a server – while it's possible to build web applications and APIs in straight JavaScript, we will actually be using a framework on top of Node called Express. It's actually quite similar to Sinatra - you'll like it!

### Why are people excited about Node?

It's new and hot in the industry but why does it matter?

A lot of developers and companies are excited because it allows you to build fast, scalable APIs and sites in JavaScript. We are _familiar_ with JavaScript and being able to use it on the backend gives us the option to use a _single programming language_ throughout an entire full-stack application.

### Asynchronous

On top of that, one of the big differences is that _Node.js_ is designed to be _event-driven_ and _asynchronous_. While earlier frameworks can only do one thing at a time, _Node_ purposefully sends slower operations (i.e. I/O operations) to the background and keeps going.

Types of I/O:

* Network requests
* Terminal input / output
* File reads and writes
* Database reads and writes

> I/O is anything that communicates beyond the CPU and core memory. Such communications are relatively slow (in the milliseconds) and thus NodeJS runs them asynchronously.


#### Code-Along 1 - Async Hello World

Here is a simple example of an async operation in JavaScript:

```javascript
setTimeout(function() {
  console.log("World!");
}, 2000);
console.log("Hello");
```

```ruby
puts "Hello"
sleep(2)              # a blocking operation
puts "World!"
```

Observations:

 In JavaScript:

* There is something fundamentally different going on.
* JavaScript apps *never* sleep. They are *always* doing something.
* JavaScript apps *can* be idling, but nothing is ever *blocked*.
* There are no mutex locks, no wait on state.
* Operations can be *deferred*, i.e. can be scheduled for a later time or triggered on an event.

#### Code-Along 2 - Sync vs. Async Sandwich Shop

##### Sync Version (Ruby)

Imagine a sandwich shop with a single line of customers waiting to place an order. When you get to the front of the line you place your order and _do not move_ until you get your food. The other customers cannot even place their orders until you have placed your order _and_ the order is prepared _and_ you get your food.  This is how _blocking_ / _synchronous_ I/O works (Ruby).

```ruby
def order_sandwich(customer, description, duration)
  puts "> #{customer} ordered a #{description}"
  sleep duration # a blocking operation
  sandwich = "a delicious #{description}"
  puts "- #{customer}, you're order is ready!"
  puts "< #{customer} is enjoying #{sandwich}"
end

order_sandwich('Jarrett', 'Roast Pork and Pickled Cucumber Sandwich', 4)
order_sandwich('Mike', 'Reuben on Rye', 2)
order_sandwich('Marc', 'Smoked Salmon Salad Sandwich', 6)
order_sandwich('Shawn', 'Apple Peanut Butter Sandwich', 1)
```

We can run this with the Unix `time` command to see how long the program takes to run:

```bash
time ruby sandwich_shop.rb
```

Note that the time is roughly the sum of the durations of the 4 sandwiches (13 seconds) because nothing could be done in parallel. Each sandwich is prepared in a _blocking_ fashion.

##### Async Version (JavaScript)

Now imagine a sandwich shop with a single line of customers waiting to place an order. When you get to the front of the line you place your order and _you get a ticket with a number on it_. Other customers are free to move up in line and place their orders and they get tickets too. When your order is ready, they call your number and you pick up your food. This is how _non-blocking_ / _asynchronous_ I/O works (JavaScript).

```javascript
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
```

Let's also run this with the Unix `time` command:

```bash
time node sandwich-shop.js
```

A total time of roughly 6 seconds (the maximum of the sandwich durations) as all 4 sandwiches could be prepared in parallel due to _non-bocking_ / _asynchronous_ execution.

Observations:

* All of the orders can be made before any of the orders are delivered.
* The sandwiches take varying amounts of time to prepare.
* The sandwiches come out in a different order than when they came in!
  - For instance, Shawn put in his order last but it came out first because it only took 1 second to make.

While it means you'll have to think & write your code a little differently than you did with a blocking framework like Sinatra or Rails, the benefit of speed is one thing a lot of folks are excited about with the introduction of _Node_.


#### Code-Along 3 - Async HTTP Request

```javascript
var http = require('http');

var options = {
  host: 'whatthecommit.com',
  path: '/index.txt'
};

callback = function(response) {
  var randomGitMessage = '';

  //another chunk of data has been recieved, so append it to `randomGitMessage`
  response.on('data', function (chunk) {
    randomGitMessage += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log('Random GIT message:', randomGitMessage);
    console.log('We are there!!!');
  });
}

console.log('Invoking an HTTP GET Request with url = http://' + options.host + options.path);
http.request(options, callback).end();
console.log('Are we there yet?');
console.log('Are we there yet?');
console.log('Are we there yet?');
```

## Ruby/Rails/Sinatra vs. JS/Node/Express

While not strictly a competition (one of the skills you have to practice is knowing which frameworks you should use in which situations), let's compare some differences.

| Why Choose Sinatra/Rails?                    | Why Choose Node/Express? |
| -------------------------------------------- | ------------------------------------------ |
| Quickest path to building app with full CRUD | JavaScript everywhere, one language to rule them all |
| Better at working with complex data relationships - ActiveRecord rocks! | Asynchronous means generally faster performance |
| When full page refreshes aren't an issue | Better _concurrency_ – it can serve data to more users with fewer computer resources |
| Synchronous programming is probably a little easier to grasp in building a straightforward program | Designed to make realtime applications (use AJAX for partial updates by pushing data instead of a full page reload) |

## Code Along 4 - Node Modules (20 mins)

Like most other modern languages, Node is modular. In essence, if a file puts something inside of module.exports, it can be made available for use in any other file using `require()`.

For example, lets make two files: `touch my-module.js main.js`

```javascript
// my-module.js
var number = 7
module.exports.fruit = "Orange"
module.exports.arr = [1, 2, 3]
module.exports.getNumber = function() {
  console.log("Get number called. Returning: ", number);
  return number;
}

console.log("End of my-module.js file");
```

```javascript
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
```

Then try running:

```
node my-module.js
node main.js
```

### Things to Note

`module.exports`:

* an object to store the things that a module _exports_

`require()`:

* reads and returns the `module.exports` of the file that was required
* it should normally be stored in a variable

> Note: The module's source file is only executed the first time that the file is required.

## npm - "Node Package Manager" - Demo (5 mins)

Before we practice using npm, you should know a more: Node uses a package management system to distribute open-source modules, just like gems.

We can use the **N**ode **P**ackage **M**anager by running its command, `npm`.

`npm` is similar to the `gem` and `bundle` commands from Ruby. But instead of using a `Gemfile`, `npm` uses a file called `package.json`.

| Ruby                                     | Node.js |
| ---------------------------------------- | ------------------------------------------ |
| `gem install <gem_name>`                 | `npm install <module_name>`                          |
| `bundle install` (works when `Gemfile` is found) | `npm install` (works when `package.json` is found) |
| `bundle update`                          | `npm update`                               |
| `rails s`                                | `npm start` (provided start is defined in `package.json`). Otherwise use `node app.js`  |

You'll use this in a handful of lessons in the coming week. For now, let's focus on you making a quick module of your own!

## Independent Practice (15 minutes)

Partner up with your neighbor - your task is to make a module together (`car.js`) and that defines a car – with both properties and functions – and export it as a module to a `main.js` file.

In the `car.js` file, define a `Car` constructor function with the following:

- Properties: make, model, color, convertible (boolean), and speed (0, at first)
- Methods: `accelerate` and `decelerate` methods:
  - each should take one argument, the speed, and add or substract it from the current speed
- define a nice `toString` method:
  - it should return a string containing the car's color, make, model, and speed.

Exports:
- `car.js` should export a Car constructor function that can be used by main.js to construct some cars.

In the `main.js` file, be sure to require the module, create a car object, and console log a message about your car object, including the current speed of the car.

## Conclusion (5 mins)

> Note: Review the solution to the independent practice

- What are some of the important distinguishing features of Node?
- Demonstrate how to run JS on your computer, both interactively & in a file
- Demonstrate how `module.exports` & `require` work
