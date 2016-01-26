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
