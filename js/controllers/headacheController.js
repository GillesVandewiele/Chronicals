/*!
 	NAAM VAN ONS PROJECT, v1.0
 	Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
    https://github.com/kianilannoye/Chronicals
    
    This file contains the controller to add and modify headaches.
 */


var app = angular.module('Chronic', ['onsen.directives']); 

app.controller("headacheController", function($scope){
  $scope.intensityValue=5; // The intensity of the headache
  $scope.startDate = new Date(); // Start date of the headache
  $scope.startTime = $scope.startDate; // Start time of the headache
  $scope.symptoms = ["symptom1", "symptom2", "symptom3", "symptom1", "symptom2", "symptom1", "symptom2", "symptom1", "symptom2",
  "symptom1", "symptom2", "symptom1", "symptom2", "symptom1", "symptom2", "symptom1", "symptom2"]; // List of all symptoms
  $scope.triggers = ["trigger1", "trigger2", "trigger3"]; // List of all triggers
  
  $scope.startTime.setSeconds(0, 0); // We don't care about seconds and milliseconds
});

$(".timePicker").on("load",function(){
	console.log("test");
  $(this).attr("type","text");
});
$(".timePicker").on("change",function(){
	console.log("test");
  $(this).attr("type","text");
});
$(".timePicker").on("touchstart",function(){
  $(this).attr("type","time");
});
