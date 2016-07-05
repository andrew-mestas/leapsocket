var express = require('express');
var bodyParser = require('body-parser').json();
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));


function fileOrDirData(filenameStr){ 
	var fileStat = fs.statSync(filenameStr);
	if(fileStat.isFile()){
		return {type: "file", name : filenameStr}
	} else if(fileStat.isDirectory()){
		return {type: "folder", name : filenameStr}
	}
}

function getFullDirData(dirPath) {
	fs.readdir(dirPath, function(err, files){
  		var filesAndFolders = [];
  		files.forEach(function(filenameStr){
 			filePath = dirPath + filenameStr;
			filesAndFolders.push(fileOrDirData(filePath));
  		});

  		return {currentDir: dirPath, filesAndFolders : filesAndFolders}
  	});

}


app.get('/', function(req, res) {
  	var dirPath = '/';
	
	dirData = getFullDirData(dirPath);
	res.send(dirData);es.send("Hello World");
});

app.post('/view', bodyParser, function(req, res) {
	
	filename = req.body.filename;
	dir = req.body.currentDir;
	var dirPath = dir + filename;
	
	dirData = getFullDirData(dirPath);
	res.send(dirData);  	
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
