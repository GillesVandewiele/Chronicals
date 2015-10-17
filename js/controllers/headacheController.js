/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller("headacheController", function($scope){
	
  // Setting the dates
  $scope.intensityValue=5; // The intensity of the headache
  $scope.startDate = new Date(); // Start date of the headache
  $scope.startTime = $scope.startDate; // Start time of the headache
  
  $scope.updateStartTimeString = function(){
  	console.log($scope.startTime);
  	var months = ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sept.", "okt.", "nov.", "dec."];
  	var month = months[$scope.startTime.getMonth()];
  	var day = $scope.startTime.getDate().toString();
  	var hour = $scope.startTime.getHours().toString();
  	if(hour < 10) hour = "0"+hour;
  	var minute = $scope.startTime.getMinutes().toString();
  	if(minute < 10) minute = "0"+minute;
  	$scope.startTimeString = day + " " + month + " " + hour + ":" + minute;
  };
  
  $scope.startTimeString = $scope.updateStartTimeString();
    
    
  // Triggers & symptoms  
  $scope.symptoms = [{id: 0, name:"symptom1", description:"this is a description"}, {id: 1, name:"symptom2", description:"this is a description"},
  {id: 2, name:"symptom3", description:"this is a description"}, {id: 3, name:"symptom4", description:"this is a description"}]; // List of all symptoms
  $scope.triggers = [{id: 0, name:"trigger1", description:"this is a description 1"}, {id: 1, name:"trigger2", description:"this is a description 2"},
  {id: 2, name:"trigger3", description:"this is a description 3"}, {id: 3, name:"trigger4", description:"this is a description 4"}]; // List of all triggers
  $scope.message = "";
  
  var searchIndexById = function(list, id){
  	// Search the index of an id in a list of objects with ids
  	for(object in list){
  		if(list[object].id == id) return object;
  	}
  	return -1;
  };

  for(trigger in $scope.triggers){
  	// Initialize function on each helpButton for each trigger
  	$(document).on("click", '#helpButtonTrigger'+$scope.triggers[trigger].id, function(){
  		var id = ($(this)[0].id).split('helpButtonTrigger');
  		var index = searchIndexById($scope.triggers, id[1]);
  		$scope.message = $scope.triggers[index].description;
  		$scope.popover.show("#"+$(this)[0].id);
  	});
  };
  
  for(symptom in $scope.symptoms){
  	// Initialize function on each helpButton for each trigger
  	$(document).on("click", '#helpButtonSymptom'+$scope.symptoms[symptom].id, function(){
  		var id = ($(this)[0].id).split('helpButtonSymptom');
  		var index = searchIndexById($scope.symptoms, id[1]);
  		$scope.message = $scope.symptoms[index].description;
  		$scope.popover.show("#"+$(this)[0].id);
  	});
  };

  ons.createPopover('popover.html').then(function(popover) {
  	// Create a popover for the help buttons
    $scope.popover = popover;
  });
  
  

});

app.directive('ngModel', function( $filter ) {
	// This is used to remove seconds and milliseconds in time pickers
    return {
        require: '?ngModel',
        link: function(scope, elem, attr, ngModel) {
            if( !ngModel )
                return;
            if( attr.type !== 'time' )
                return;
                    
            ngModel.$formatters.unshift(function(value) {
                return value.replace(/(:\d\d)(:.*)$/, '\$1');
            });
        }
    };   
});  
