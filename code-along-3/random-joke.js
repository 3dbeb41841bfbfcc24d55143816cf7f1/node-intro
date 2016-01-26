var http = require('http');

var options = {
  host: 'api.icndb.com',
  path: '/jokes/random'
};

callback = function(response) {
  var message = '';

  //another chunk of data has been recieved, so append it to `message`
  response.on('data', function (chunk) {
    message += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var messageAsObject = JSON.parse(message);
    console.log('Random Joke:', messageAsObject.value.joke);
    console.log('We are there!!!');
  });
}

console.log('Invoking an HTTP GET Request with url = http://' + options.host + options.path);
http.request(options, callback).end();
console.log('Are we there yet?');
console.log('Are we there yet?');
console.log('Are we there yet?');
