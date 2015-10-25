/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */


angular.module('Chronic').controller("settingsController", function($scope, dataService) {


    $scope.clearCache = function(){
        console.log("Clearing cache: ");

        dataService.clearCache();

    }





});


//window.onload = $scope.fillEvents;
//});



