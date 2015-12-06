/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */


angular.module('Chronic').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";

    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

}]).controller('registerController', function ($scope, dataService, $http) {

    ons.ready(function () {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    $scope.transition = function () {
        //console.log($("body").children());
        $("body").children().eq(0).show();
        $('body').children().eq(1).hide();
    };

    $scope.email = "";
    $scope.password = "";

    $scope.firstname = "";
    $scope.lastname = "";

    $scope.birthdate = "";

    $scope.sex = "";

    $scope.status = "";

    $scope.employment = "";


    $scope.submitRegister = function () {
        //console.log("firstname: ", $scope.firstname);
        //console.log("lastname: ", $scope.lastname);
        //console.log("birthdate: ", $scope.birthdate);
        //console.log("sex: ", $scope.sex);
        //console.log("status: ", $scope.status);
        //console.log("employment: ", $scope.employment);
        //console.log("email: ", $scope.email);
        //console.log("password: ", $scope.password);

        //TODO: check if username already exists and stuff


        var user = {
            "firstName": $scope.firstname,
            "lastName": $scope.lastname,
            "birthDate": "",
            "email": $scope.email,
            "password": "" + sha3_512($scope.password),
            "isMale": true,
            //"relation": 2,
            "advice": "",
            "isEmployed": true,
            "diagnosis": ""
        };


        $http.post('http://tw06v033.ugent.be/Chronic/rest/PatientService/patients', JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        //$http({ method: 'POST', url: 'http://localhost:8080/Chronic/rest/PatientService/patients' , body: JSON.stringify(user)}).
        success(function (data, status, headers, config) {

            console.log("Return van indienen user:" + status);
            dataService.clearCache();
            dataService.registerUser(user.firstName, user.lastName, user.birthDate, user.isMale, "", user.isEmployed, user.email, user.password, 0);
            location.href = "login.html";
        }).
        error(function (data, status, headers, config) {
            console.log("error creating user: " + status);
            console.log("data:" + data);
            alert("Geen verbinding met de REST service, we gaan verder met lokale gegevens voor testing-purposes");
            dataService.clearCache();
            location.href = "login.html";
        });


    }

});

