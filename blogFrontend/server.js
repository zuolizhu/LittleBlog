// serve up angular front end page
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 4200);
app.use(express.static(__dirname));
var http = require('http').Server(app);
// Route
app.get('/', function (req, res,next) {
  res.redirect('/'); 
 });

http.listen(app.get('port'), () => {
  console.log('Front end running up on ' + app.get('port'))
})