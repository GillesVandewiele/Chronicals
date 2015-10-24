/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('headacheController', function($scope, dataService){

  /* Initialize the current headache (this is not null when we are modifying) */

  $scope.headache = dataService.getCurrentHeadache();

  if($scope.headache == null){
  	$scope.headache = { intensityValues: [{key: new Date(), value: 5}], end: null, location: null, triggers: [], symptoms: []};
  }

  $scope.end;

  $scope.setEnd = function(endDate, endTime){
  	$scope.headache.end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes());
  };

  /* Create a nice short time string from the start date and time */

  $scope.updateStartTimeString = function(){
  	var months = ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sept.", "okt.", "nov.", "dec."];
  	var month = months[(new Date($scope.headache.intensityValues[0].key).getMonth())];
  	var day = (new Date($scope.headache.intensityValues[0].key).getDate().toString());
  	var hour =(new Date($scope.headache.intensityValues[0].key).getHours().toString());
  	if(hour < 10) hour = "0"+hour;
  	var minute = new Date($scope.headache.intensityValues[0].key).getMinutes().toString();
  	if(minute < 10) minute = "0"+minute;
  	$scope.startTimeString = day + " " + month + " " + hour + ":" + minute;
  };

  $scope.$watch('headache.intensityValues[0]', $scope.updateStartTimeString);

  /* closeAndSave is called when the user pressed the "Sla op" button */

  $scope.closeAndSave = function(){
  	console.log($scope.headache);
  	var start = null;

	// Convert the start date & time of the earliest intensity to one Date object
  	if($scope.headache.intensityValues[0].key != null)
  		var start = new Date(new Date($scope.headache.intensityValues[0].key).getFullYear(), new Date($scope.headache.intensityValues[0].key).getMonth(), new Date($scope.headache.intensityValues[0].key).getDate(), new Date($scope.headache.intensityValues[0].key).getHours(), new Date($scope.headache.intensityValues[0].key).getMinutes());

  	console.log(start);
  	console.log($scope.headache.end);

  	dataService.addHeadache($scope.headache);
  	dataService.setCurrentHeadache(null);
  	location.href="dashboard.html";
  };

  /* Loading the triggers and symptoms, also some ugly hack with jQuery to link a popover the the corresponding help buttons */
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

  for(trigger in $scope.headache.triggers){ // Close your eyes and pretend this is not here ;)
  	// Initialize function on each helpButton for each trigger
  	$(document).on("click", '#helpButtonTrigger'+$scope.headache.triggers[trigger].id, function(){
  		var id = ($(this)[0].id).split('helpButtonTrigger');
  		var index = searchIndexById($scope.headache.triggers, id[1]);
  		$scope.message = $scope.headache.triggers[index].description;
  		$scope.popover.show("#"+$(this)[0].id);
  	});
  };

  for(symptom in $scope.headache.symptoms){ // Close your eyes and pretend this is not here ;)
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

  /* All variables and functions used to add intensity values and delete them */

  $scope.newHeadacheValue;
  $scope.newHeadacheDate;
  $scope.newHeadacheTime;

  $scope.deleteEntry = function(item){
  	console.log(item);
  	$scope.headache.intensityValues.splice($scope.headache.intensityValues.indexOf(item), 1);
  };

    $scope.setNewHeadacheValue = function(newValue){
        $scope.newHeadacheValue = newValue;
    };

  $scope.addIntensityValue = function(){
  	console.log("Adding default values");
  	$scope.newHeadacheValue = 5;
  	$scope.newHeadacheDate = new Date();
  	$scope.newHeadacheTime = $scope.newHeadacheDate;
  };

  $scope.saveIntensityValue = function(){
  	var start = new Date($scope.newHeadacheDate.getFullYear(), $scope.newHeadacheDate.getMonth(), $scope.newHeadacheDate.getDate(), $scope.newHeadacheTime.getHours(), $scope.newHeadacheTime.getMinutes());
	$scope.headache.intensityValues.push({key: start, value: $scope.newHeadacheValue});
	$scope.headache.intensityValues.sort(function(a, b){
		if(a.key < b.key) return -1;
		if(a.key > b.key) return 1;
		else return 0;
	});
  	console.log("Saving the value"+$scope.newHeadacheValue+$scope.newHeadacheDate+$scope.newHeadacheTime+"!!");
  };

    $scope.setValues = function (v, d, t) {
        $scope.newHeadacheValue = v;
        $scope.newHeadacheDate = d;
        $scope.newHeadacheTime = t;
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
