/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */


angular.module('Chronic').controller('registerController', function($scope, dataService,$http){

    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    $scope.transition = function(){
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



    $scope.submitRegister = function(){
        console.log("firstname: ", $scope.firstname);
        console.log("lastname: ", $scope.lastname);
        console.log("birthdate: ", $scope.birthdate);
        console.log("sex: ", $scope.sex);
        console.log("status: ", $scope.status);
        console.log("employment: ", $scope.employment);
        console.log("email: ", $scope.email);
        console.log("password: ", $scope.password);

        //TODO: check if username already exists and stuff


        var user = {"firstName": "Kiani",
            "lastName": "Lannoye",
            "birthDate": null,
            "email": "kdlannoy@gmail.com",
            "password": "afd1s235f1a53ds1q23f1e53a",
            "isMale": true,
            "relationshipStatus": 0,
            "advice":"",
            "isEmployed": true,
            "diagnosis": ""};

        //$http({ method: 'POST', url: 'http://localhost:8080/Chronic/rest/PatientService/patients' , body: user}).
        $http.post('http://localhost:8080/Chronic/rest/PatientService/patients', user).
        success(function (data, status, headers, config) {

            console.log("Return van indienen user:"+status);
        }).
        error(function (data, status, headers, config) {
            console.log("error creating user: "+status);
            console.log("data:" +data);
        });

        dataService.registerUser($scope.firstname, $scope.lastname, $scope.birthdate, $scope.sex, $scope.status, $scope.employment, $scope.email, CryptoJS.SHA3($scope.password));
        location.href="dashboard.html";
    }

});

