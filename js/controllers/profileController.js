/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */


angular.module('Chronic').controller('profileController', function($scope, dataService){

    $scope.dailyMedicines = dataService.getDailyMedicines();
    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        console.log($scope.dailyMedicines)
    });

    $scope.deleteEntry = function(item){
        $scope.dailyMedicines.splice($scope.dailyMedicines.indexOf(item), 1);
        dataService.setDailyMedicineList($scope.dailyMedicines)
    };





});

