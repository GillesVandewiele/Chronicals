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

    $scope.user = dataService.getCurrentUser();

    if($scope.user != null) {
        $scope.sexes = ["Man", "Vrouw"];
        if ($scope.user.sex) $scope.sex = $scope.sexes[0];
        else $scope.sex = $scope.sexes[1];

        $scope.birthdate = new Date($scope.user.birthdate);

        $scope.relationships = ["Vrijgezel", "In relatie", "Getrouwd"];
        console.log("USER STATUS = ", $scope.user.status);
        if ($scope.user.status == "VRIJGEZEL") $scope.relationship = $scope.relationships[0];
        else if ($scope.user.status == "GETROUWD") $scope.relationship = $scope.relationships[2];
        else $scope.relationship = $scope.relationships[1];

        $scope.employments = ["Beroepsmatig", "Werkloos"];
        if ($scope.user.employment) $scope.employment = $scope.employments[0];
        else $scope.employment = $scope.employments[1];

        $scope.parsedDate = new Date($scope.user.birthdate);
        //TODO parse this date and init the model of the date picker
    };
    console.log($scope.user);

    $scope.saveUser = function(){
        // If oldPin is not null, then the user wants to change his password
        if($scope.oldPin != null){
            var user = {
                "firstName": $scope.user.firstname,
                "lastName": $scope.user.lastname,
                "birthDate": $scope.birthdate,
                "email": $scope.email,
                "password": "" + sha3_512($scope.password),
                "isMale": ($scope.sex),
                "relation": $scope.status.toUpperCase(),
                "advice": "",
                "isEmployed": ($scope.employment == "Beroepsmatig"),
                "diagnosis": ""
            };
        } else {

        }
        console.log("Saving new user..");
    };


    //TODO: get current user from dataservice and initialize all inputs on profile page!


});

