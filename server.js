//Set up server
var express = require('express');
var debug = require('debug')('handle');

var app = express();
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = { server, app };