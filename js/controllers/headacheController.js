/*!
 	NAAM VAN ONS PROJECT, v1.0
 	Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
    https://github.com/kianilannoye/Chronicals
    
    This file contains the controller to add and modify headaches.
 */


var app = angular.module('Chronic', ['onsen.directives']); 

app.controller("headacheController", function($scope){
  $scope.intensityValue=5; // The intensity of the headache
});

var options = {
  date: new Date(),
  mode: 'date'
};

window.onload = function(){
	console.log("test");
};

$("#test").click(function(){
	console.log("test");
    // show picker
    datePicker.show(options, function(date){
    //get result
        alert("date result " + date);  
    });
});