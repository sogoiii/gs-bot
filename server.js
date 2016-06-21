'use strict';
const restify = require('restify')
const logger = require('morgan')
const querystring = require('querystring');
const config = require('./config');

const checkStatus = require('./lib/checkStatus');

var server = restify.createServer()
server.use(logger('tiny'))

server.post('/pr', restify.bodyParser(), function (req, res) {
  let params = querystring.parse(req.body);

  if(params.text.toLowerCase() === 'help'){
    res.send({
      text: 'So you need help huh! Reivew the commands below: \n /pr ${open || closed} ${number}. For example /pr open 3 \n /pr org:${org} is:${issue || pr} author:${username}. For example /pr org:nodejs is:pr author:orangemocha \n'
    });
  }

  return checkStatus({text: params.text}, function(err, msg){
    return res.send(msg);
  });
});

server.get('/pr', function (req, res) {
  res.send(200, 'Ok')
})

server.listen(config.port, function (err) {
  if (err) {
    return console.error('Error starting server: ', err)
  }
  console.log('Server successfully started on port %s', config.port)
})
