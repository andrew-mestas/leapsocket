var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send("Hello World");
});



app.post('/view', function(req, res) {
	console.log(req)
  res.send("view");
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


app.listen(3000, function() {
  console.log("Listening on port 3000...");
});
