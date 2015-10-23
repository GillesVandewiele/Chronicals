/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('headacheController', function($scope, dataService){
	
  // First try to get the headache from the dataService, if it's null we initialize some default values
  $scope.headache = dataService.getCurrentHeadache();
  
  if($scope.headache == null){
  	$scope.headache = { intensityValue: 5, startDate: new Date(), startTime: null, endDate: null, endTime: null, 
  						location: null, triggers: null, symptoms: null};
  	$scope.headache.startTime = $scope.headache.startDate;
  }
  
  $scope.updateStartTimeString = function(){
  	var months = ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sept.", "okt.", "nov.", "dec."];
  	var month = months[$scope.headache.startDate.getMonth()];
  	var day = $scope.headache.startDate.getDate().toString();
  	var hour = $scope.headache.startDate.getHours().toString();
  	if(hour < 10) hour = "0"+hour;
  	var minute = $scope.headache.startTime.getMinutes().toString();
  	if(minute < 10) minute = "0"+minute;
  	$scope.startTimeString = day + " " + month + " " + hour + ":" + minute;
  };
  
  $scope.$watch('startDate', $scope.updateStartTimeString);
  $scope.$watch('startTime', $scope.updateStartTimeString);
  
  $scope.closeAndSave = function(){
  	// This is executed when the user finishes
  	console.log($scope.headache);
  	
  	// Convert end/startDate & end/startTime to two Dates
  	if($scope.headache.endDate != null && $scope.headache.endTime != null)
  		var end = new Date($scope.headache.endDate.getYear(), $scope.headache.endDate.getMonth(), $scope.headache.endDate.getDay(), $scope.headache.endTime.getHours(), $scope.headache.endTime.getMinutes());
  	
  	if($scope.headache.startDate != null && $scope.headache.startTime != null)
  		var start = new Date($scope.headache.startDate.getYear(), $scope.headache.startDate.getMonth(), $scope.headache.startDate.getDay(), $scope.headache.startTime.getHours(), $scope.headache.startTime.getMinutes());
  	
  	dataService.setCurrentHeadache(null);
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
