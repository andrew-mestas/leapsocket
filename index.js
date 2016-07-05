var express = require('express');
var bodyParser = require('body-parser').json();
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send("Hello World");
});


app.post('/view',bodyParser, function(req, res) {

  	var isFileOrDir = function(filenameStr){ 
	 	var fileStat = fs.statSync(filenameStr);
	 	if(fileStat.isFile()){
	 		return {type: "file", name : filenameStr}
		} else if(fileStat.isDirectory()){
			return {type: "folder", name : filenameStr}
		}
  	}

	fs.readdir("/", function(err, files){
	var root = "/";
	var currentDir = root ;
  	var filesAndFolders = [];
  	files.forEach(function(filenameStr){
  		console.log(filenameStr)
 		root += filenameStr;
		filesAndFolders.push(isFileOrDir(root));

 		root = "/";

  	})

  	res.send({current: currentDir, filesAndFolders : filesAndFolders})
  	});


	// });
});

app.post('/copy', function(req, res) {
  res.send("copy");
});

app.post('/paste', function(req, res) {
  res.send("paste");
});

app.post('/delete', function(req, res) {
  res.send("delete");
});

app.post('/make', function(req, res) {
  res.send("make");
});

app.post('/move', function(req, res) {
  res.send("move");
});

app.post('/rename', function(req, res) {
  res.send("rename");
});



app.listen(3000, function() {
  console.log("Listening on port 3000...");
});
