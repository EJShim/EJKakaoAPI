/**
 * Created by http://myeonguni.com on 2016-09-02.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

var port = process.env.PORT || 8080;
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


var router = require('./router/main')(app, fs);
