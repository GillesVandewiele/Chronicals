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
  $scope.symptoms = [{name:"symptom1", description:"this is a description"}, {name:"symptom2", description:"this is a description"},
  {name:"symptom3", description:"this is a description"}, {name:"symptom4", description:"this is a description"}]; // List of all symptoms
  $scope.triggers = [{name:"trigger1", description:"this is a description"}, {name:"trigger2", description:"this is a description"},
  {name:"trigger3", description:"this is a description"}, {name:"trigger4", description:"this is a description"}]; // List of all triggers

  ons.createPopover('popover.html').then(function(popover) {
    $scope.popover = popover;
  });
  
  $scope.show = function(e) {
  	console.log(e);
    $scope.popover.show(e);
  };

});

app.directive('ngModel', function( $filter ) {
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
