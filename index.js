var express = require('express');
var bodyParser = require('body-parser').json();
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));


function fileOrDirData(filenameStr){ 
	if(filenameStr.split(".")[1] != "tab"){
	var fileStat = fs.statSync(filenameStr);

	if(fileStat.isFile()){
		return {type: "file", name : filenameStr}
	} else if(fileStat.isDirectory()){
		return {type: "folder", name : filenameStr}
	}
}
}

function sendFolderData(dirPath, res) {
	fs.readdir(dirPath, function(err, files){
		if(!err){
  		var filesAndFolders = [];
  		files.forEach(function(filenameStr){
 			filePath = dirPath + filenameStr;
			filesAndFolders.push(fileOrDirData(filePath));
  		});
		}
  		res.send({currentDir: dirPath, filesAndFolders : filesAndFolders});
  	});

}


app.post('/', function(req, res) {
  	var dirPath = '/';
	
	sendFolderData(dirPath, res);
	// console.log(dirData)
	// res.send(dirData);
});

app.post('/view', bodyParser, function(req, res) {
	
	filename = req.body.filename + "/";
	// filename.splice(0,1);
	dir = req.body.currentDir;
	// console.log(filename, dir)
	if(dir.slice(dir.length - 1) == "/"){
		dir = dir.split("");
		dir.splice(dir.length - 1, 1);
		dir = dir.join("");
	}
	var dirPath = dir + filename;
	console.log(dirPath)
	sendFolderData(dirPath, res);
	// res.send(dirData);  	
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
