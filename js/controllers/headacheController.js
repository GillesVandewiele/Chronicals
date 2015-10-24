/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('headacheController', function($scope, dataService){
  
  $scope.headache = dataService.getCurrentHeadache();
  
  if($scope.headache == null){
  	$scope.headache = { intensityValues: [{key: new Date(), value: 5}], start: new Date(), endDate: null, endTime: null, 
  						location: null, triggers: [], symptoms: []};
  }
  $scope.headache.startDate = $scope.headache.start;
  $scope.headache.startTime = $scope.headache.startDate;
  
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
  	
  	var end = null;
  	var start = null;
  	
  	// Convert end/startDate & end/startTime to two Dates
  	if($scope.headache.endDate != null && $scope.headache.endTime != null)
  		var end = new Date($scope.headache.endDate.getFullYear(), $scope.headache.endDate.getMonth(), $scope.headache.endDate.getDate(), $scope.headache.endTime.getHours(), $scope.headache.endTime.getMinutes());
  	
  	if($scope.headache.startDate != null && $scope.headache.startTime != null)
  		var start = new Date($scope.headache.startDate.getFullYear(), $scope.headache.startDate.getMonth(), $scope.headache.startDate.getDate(), $scope.headache.startTime.getHours(), $scope.headache.startTime.getMinutes());
  	
  	console.log(start);
  	
  	dataService.addHeadache({ intensityValue: $scope.headache.intensityValue, start: start, end: end, location: $scope.headache.location, 
  					 		  triggers: $scope.headache.triggers, symptoms: $scope.headache.symptoms}); 	
  	dataService.setCurrentHeadache(null);	
  	location.href="dashboard.html";			 
  };  

  // Triggers & symptoms  
  $scope.headache.symptoms = dataService.getSymptoms();
  $scope.headache.triggers = dataService.getTriggers();
  $scope.message = "";
  
  var searchIndexById = function(list, id){
  	// Search the index of an id in a list of objects with ids
  	for(object in list){
  		if(list[object].id == id) return object;
  	}
  	return -1;
  };

  for(trigger in $scope.headache.triggers){
  	// Initialize function on each helpButton for each trigger
  	$(document).on("click", '#helpButtonTrigger'+$scope.headache.triggers[trigger].id, function(){
  		var id = ($(this)[0].id).split('helpButtonTrigger');
  		var index = searchIndexById($scope.headache.triggers, id[1]);
  		$scope.message = $scope.headache.triggers[index].description;
  		$scope.popover.show("#"+$(this)[0].id);
  	});
  };
  
  for(symptom in $scope.headache.symptoms){
  	// Initialize function on each helpButton for each trigger
  	$(document).on("click", '#helpButtonSymptom'+$scope.headache.symptoms[symptom].id, function(){
  		var id = ($(this)[0].id).split('helpButtonSymptom');
  		var index = searchIndexById($scope.headache.symptoms, id[1]);
  		$scope.message = $scope.headache.symptoms[index].description;
  		$scope.popover.show("#"+$(this)[0].id);
  	});
  };
  
  $(document).on("click", '.popover', function(){
  	$scope.popover.hide();
  });

  ons.createPopover('popover.html').then(function(popover) {
  	// Create a popover for the help buttons
    $scope.popover = popover;
  });
  
  $scope.deleteEntry = function(item){
  	console.log(item);
  	$scope.headache.intensityValues.splice($scope.headache.intensityValues.indexOf(item), 1);
  };
  

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
