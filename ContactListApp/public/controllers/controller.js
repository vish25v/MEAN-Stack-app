

var app = angular.module("App1", []);

app.controller("AppCtrl", function($scope, $http){
	console.log("Hello from the controller");


var refresh = function() {
	$http.get("/contactlist").then(function(response){
		console.log("I got the data I requested!");
		$scope.contactlist = response.data;

		$scope.contact = {name:"", email: "", number: ""};
	});
};
	 refresh();
	 // $scope.contactlist = contactlist;

	 // to PUT data into MongoDB database

	 $scope.addContact = function(){
	 	console.log($scope.contact);
	 	$http.post("contactlist", $scope.contact).then(function(response){
			console.log("post response sending to MongoDB");
			console.log(response);	 
			refresh();		
	 	})
	 };

	 $scope.remove = function(id){
	 	console.log(id);
	 	$http.delete('/contactlist/' + id).then(function(response){
	 		refresh();
	 	});
	 };

	 // to update the contact: get the id of the contact,

	 $scope.edit = function(id){
	 	console.log(id);
	 	$http.get('/contactlist/' + id).then(function(response){
	 		console.log(response.data);
	 		$scope.contact = response.data;

	 	});
	 };

	 $scope.update= function(){
	 	console.log($scope.contact._id);
	 	// making PUT req to update the DB
	 	 $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
	 	 	refresh();
	 	 });
	 };

	 $scope.deselect = function(){
	 	$scope.contact = {name: "", email: "", number: ""};
	 };


});