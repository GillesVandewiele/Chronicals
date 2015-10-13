/*!
 	NAAM VAN ONS PROJECT, v1.0
 	Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
    https://github.com/kianilannoye/Chronicals
    
    This file contains the controller to add and modify headaches.
 */


var app = angular.module('Chronic', ['onsen.directives']); 

app.controller("headacheController", function($scope){
  $scope.intensityValue=5; // The intensity of the headache
  $scope.startDate = new Date();
  $scope.startTime = new Date();
  $scope.startTime.setSeconds(0, 0);
});
