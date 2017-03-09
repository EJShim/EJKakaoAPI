/**
 * Created by http://myeonguni.com on 2016-09-02.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

///temp
var parse = require('csv-parse');

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



///TEMP = parse csv
// var result = [];
// fs.createReadStream(__dirname + "/data/talk.csv")
//   .pipe(parse({delimiter: ','}))
//      .on('data', function(csvrow) {
//        if(csvrow[1] == "심응준"){
//          result.push(csvrow[2]);
//        }
//      })
//     .on('end',function() {
//       console.log("finished");
//
//
//       //Write data
//       fs.readFile( __dirname + "/data/message.json", 'utf8',  function(err, data){
//         var pData = JSON.parse(data);
//         pData["array"] = result;
//
//         fs.writeFile(__dirname + "/data/message.json",
//         			 JSON.stringify(pData, null, '\t'), "utf8", function(err, data){
//         })
//
//
//       });
//     });


var router = require('./router/main')(app, fs);
