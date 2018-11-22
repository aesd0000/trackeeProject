var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
//var https = require('https');
var config = require('./config');
var httpPort = process.env.httpPort || 4000;
//var httpsPort = process.env.httpsPort || 443;

var app = express();

/*function requireHTTPS(req, res, next) {
  var host = req.get('host');
  if(host != config.host) {
    host = config.host;
    return res.redirect('https://' + host + req.url);
  } else {
    if (!req.secure) {
      return res.redirect('https://' + host + req.url);
    }
  }
  next();
}*/

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static(path.join(__dirname, 'Eterna')));

// app.get('/*', function(req, res){
//   res.sendFile(path.join(__dirname, 'Eterna', 'index.html'));
// });

if (require.main === module) {
  app.listen(httpPort, function() {
    console.log('Server http listening on port %d', this.address().port);
  });
  /*https.createServer(config.ssl_options, app).listen(httpsPort, function () {
    console.log('Server https listening on port %d', this.address().port);
  });*/
}
