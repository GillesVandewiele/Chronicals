/*!
 Chronicals, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */


angular.module('Chronic').controller('profileController', function($scope, dataService){

    $scope.dailyMedicines = dataService.getDailyMedicines();
    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    $scope.transition = function(){
        //console.log($("body").children());
        $("body").children().eq(0).show();
        $('body').children().eq(1).hide();
    };


    $scope.deleteEntry = function(item){
        $scope.dailyMedicines.splice($scope.dailyMedicines.indexOf(item), 1);
        dataService.setDailyMedicineList($scope.dailyMedicines)
    };

    $scope.user = dataService();

    $scope.sexes = ["Man", "Vrouw"];
    if($scope.user.sex) $scope.sex=$scope.sexes[0];
    else $scope.sex=$scope.sexes[1];

    $scope.employments = ["Beroepsmatig", "Werkloos"];
    if($scope.user.employment) $scope.employment = $scope.employments[0];
    else $scope.employment = $scope.employments[1];

    //console.log($scope.user);


    //TODO: get current user from dataservice and initialize all inputs on profile page!


});

