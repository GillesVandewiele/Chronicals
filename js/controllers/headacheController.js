/*!
 	NAAM VAN ONS PROJECT, v1.0
 	Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
    https://github.com/kianilannoye/Chronicals
    
    This file contains the controller to add and modify headaches.
 */

var app = angular.module('Chronic', ['onsen.directives']); 
	app.controller('PageController', function($scope) {
	  var options = $scope.myNavigator.getCurrentPage().options;
	  console.log(myNavigator.getPages().length);
	  console.log(options);
});

app.controller("TestCtrl", function($scope){
  $scope.firstRanger=50;
  $scope.secondRanger = 150;
});