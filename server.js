// server.js
//import { ProceduralRenderer3 } from '@angular/core/src/render3/interfaces/renderer';

var fs = require('fs');
var http = require('http');
//var https = require('https');
var cors = require('cors');

//Avec clé privée et son mot de passe
// var options = {
//   key: fs.readFileSync('ca.key', 'utf8'),
//   cert: fs.readFileSync('ca.crt', 'utf8'),
//   passphrase: 'Rickan1234'
// };

// NE MARCHERA QUE SI ON A UN NOM DE DOMAINE A NOUS.
//ICI LE CA_SPP.KEY sera le fichier de notre clé.
//ClecerCloud fournit deja le TLS pour les domaines cleverapps.io

//Pour du SSL CleverCloud il faudra transmettre les certificats intermédiaires et la clé privée à CleverCloud :*
//https://api.clever-cloud.com/v2/certificates/new
//LEs certificats intermédiaires sont données pour l'porganisme de cettif a qui on déclare le nom de domaine.
//On leur donne notre clé privée qui eux signeront et nous donneront en retour ce fameux certificat intémédiare

// var options = {
//   key: fs.readFileSync('ca_spp.key', 'utf8'),
//   cert: fs.readFileSync('ca.crt', 'utf8')
// };


var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//Premuni de "Cannot GET /bienvenue" ou autre lien....
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});


// OU
//console.log(app.routes);
//
//app.get('*', app.routes.index);
//// serve index and view partials
// app.get('/', routes.index);
// // redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

//app.get('/', function (req, res) { res.redirect('/dist/index.html') });


//Gestion du CORS
//Dans le cas d'une execution de Angular sur un serveur différent du BackEnd !
// app.use(function (req, res, next) {
//   //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, X-Requested-With, Accept, Origin, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
//   next();
// });



//Gestion du CORS
//Dans le cas d'une execution de Angular sur un serveur différent du BackEnd !
// app.use(function(req, res, next) {
//   var oneof = false;
//   if(req.headers.origin) {
//       res.header('Access-Control-Allow-Origin', req.headers.origin);
//       oneof = true;
//   }
//   if(req.headers['access-control-request-method']) {
//       res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
//       oneof = true;
//   }
//   if(req.headers['access-control-request-headers']) {
//       res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
//       oneof = true;
//   }
//   if(oneof) {
//       res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
//   }

//   // intercept OPTIONS method
//   if (oneof && req.method == 'OPTIONS') {
//       res.send(200);
//   }
//   else {
//       next();
//   }
// });

//Gestion du CORS
//Dans le cas d'une execution de Angular sur un serveur différent du BackEnd !
// var corsOptions = {
//   origin: 'http://app-28286c7a-6571-43b1-96b0-6352d129ffdd.cleverapps.io/devoirsfaits',
//   credentials: true,
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
  "preflightContinue": false,
  "credentials": true
}

app.use(cors(corsOptions));

// your express configuration here

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(options, app);

// Start the app by listening on the default
// CleverCloud or Heroku port

httpServer.listen(process.env.PORT || 80);
//httpsServer.listen(8443);

