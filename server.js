'use strict';
const restify = require('restify');
const logger = require('morgan');
const querystring = require('querystring');
const config = require('./config');

const checkStatus = require('./lib/checkStatus');

var server = restify.createServer();
server.use(logger('tiny'));
server.use(restify.bodyParser());

server.post('/pr', function (req, res) {
  let params = req.params;

  if(params.text.toLowerCase() === 'help') {
    res.send({
          "text": "So you need help huh! Reivew the commands below:",
          "attachments": [
              {
                  "text": "You can enter open or closed with an optional number. \n /pr ${open || closed} ${number} \n 1. /pr open 4 \n 2. /pr closed 3"
              },
              {
                  "text": "Access github search filters directly. \n /pr org:${org} is:${issue || pr} author:${username}. \n 1. /pr org:nodejs is:pr author:octocat \n 2. /pr org:nodejs is:issue"
              }
          ]
      });
  }

  return checkStatus({text: params.text}, function(err, msg){
    return res.send(msg);
  });
});

server.get('/pr', function (req, res) {
  return res.send(200, 'Ok');
});

server.listen(config.port, function (err) {
  if (err) {
    return console.error('Error starting server: ', err);
  }
  console.log('Server successfully started on port %s', config.port);
});

process.on('uncaughtException', function (err) {
  console.log(`Caught exception: ${err}`);
  console.log(err.stack);
});

process.on('unhandledRejection', function (reason, p)  {
  console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
