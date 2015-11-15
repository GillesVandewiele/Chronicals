/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('registerController', function($scope, dataService){

    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    $scope.email = "";
    $scope.password = "";

    $scope.firstname = "";
    $scope.lastname = "";

    $scope.birthdate = "";

    $scope.sex = "";

    $scope.status = "";

    $scope.employment = "";



    $scope.submitRegister = function(){
        console.log("firstname: ", $scope.firstname);
        console.log("lastname: ", $scope.lastname);
        console.log("birthdate: ", $scope.birthdate);
        console.log("sex: ", $scope.sex);
        console.log("status: ", $scope.status);
        console.log("employment: ", $scope.employment);
        console.log("email: ", $scope.email);
        console.log("password: ", $scope.password);

        dataService.registerUser($scope.firstname, $scope.lastname, $scope.birthdate, $scope.sex, $scope.status, $scope.employment, $scope.email, CryptoJS.SHA3($scope.password));
        location.href="dashboard.html";
    }

});

