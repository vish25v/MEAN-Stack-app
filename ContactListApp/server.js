var express = require('express');
var mongoJS = require('mongoJS');
var db = mongoJS('contactlist', ['contactlist']); // name of db and collection
var app = express();
var bodyParser = require('body-parser');


// app.get('/', function(req,res){
// 	res.send("Hello World from server.js")
// });

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/contactlist', function(req,res){
	console.log('I received a GET request');


// --------	 WHEN WE WANT TO SEND DATA FROM THE SERVER.JS -------
	// person1 = {
	//  	name: 'Tim Cooper',
	//  	email: 'time@mymail.com',
	//  	number: '551-898-9900'
	//  };

	//  person2 = {
	//  	name: 'Jane More',
	//  	email: 'jane@mymail.com',
	//  	number: '990-498-5500'
	//  };

	//  person3 = {
	//  	name: 'Liam Pyae',
	//  	email: 'liam@mymail.com',
	//  	number: '888-787-6600'
	//  };

	//  var contactlist = [person1, person2, person3];

	//  res.json(contactlist);


//---------------------------------------------------

	db.contactlist.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});



});


app.post('/contactlist', function(req,res){
	
	console.log("from database:");
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});

});

app.delete('/contactlist/:id', function(req,res){
	var id = req.params.id;
	console.log("Deleting in server!");
	console.log(id);
	console.log(req.body.name);
	// delete from DB
	db.contactlist.remove({_id: mongoJS.ObjectID(id)}, function(err,docs){
		res.json(docs);
	});

});

app.get('/contactlist/:id', function(req,res){
	var id = req.params.id;
	console.log("Contact to edit (got req from the client):");
	console.log(id);
	db.contactlist.findOne({_id: mongoJS.ObjectID(id)}, function(err, docs){
		res.json(docs);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify(
		{
			query:{_id: mongoJS.ObjectID(id)},
			update:{$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
			new: true
		}, function(err, docs){
			res.json(docs);
		}
	);
});

app.listen(3000);
console.log("Server running on port 3000");