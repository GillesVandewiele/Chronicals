/*!
 Chronicals, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('manualController', function($scope, dataService, $http){

    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();

        localStorage.setItem("test", "foo");


        var user = {"firstName": "Bart",
            "lastName": "Peeters",
            "birthDate": "1992-12-23",
            "email": "bart_peeters@gmail.com",
            "password": "afd1s235f1a53ds1q23f1e53a",
            "isMale": true,
            "relationshipStatus": 0,
            "advice":"",
            "isEmployed": true,
            "diagnosis": ""};

        //$http({ method: 'POST', url: 'http://localhost:8080/Chronic/rest/PatientService/patients' , body: user}).
        $http.post('http://tw06v033.ugent.be/Chronic/rest/PatientService/patients', user).
        success(function (data, status, headers, config) {

            console.log("Return van indienen user:"+status);
        }).
        error(function (data, status, headers, config) {
            console.log("error creating user: "+status);
            console.log("data:" +data);
        });

        //
        //var user = {"firstName": $scope.firstname,
        //    "lastName": $scope.lastname,
        //    "birthDate": $scope.birthdate,
        //    "email": $scope.email,
        //    "password": $scope.password,
        //    "isMale": $scope.sex,
        //    "relationshipStatus": $scope.status,
        //    "advice":"",
        //    "isEmployed": ($scope.employment == "Werkloos")?0:1,
        //    "diagnosis": ""};
        //
        ////$http({ method: 'POST', url: 'http://localhost:8080/Chronic/rest/PatientService/patients' , body: user}).
        //$http.post('http://localhost:8080/Chronic/rest/PatientService/patients', user).
        //success(function (data, status, headers, config) {
        //
        //    alert("Return van indienen user:"+status);
        //}).
        //error(function (data, status, headers, config) {
        //    alert("error creating user: "+status);
        //    alert("data:" +data);
        //});

        //$http({
        //    method: 'POST',
        //    url: 'http://localhost:8080/Chronic/rest/PatientService/patients',
        //    dataType: 'json',
        //    data: JSON.stringify(user),
        //    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        //}).
        //success(function(data, status, headers, config) {
        //    $scope.displayres = data
        //    $scope.answer = 'Data has been successfully posted.';
        //    console.log("Success:"+$scope.displayres);
        //    console.log("Success:"+$scope.answer);
        //    //console.log(data);
        //}).
        //error(function(data, status, headers, config) {
        //    $scope.displayres = data
        //    $scope.answer = 'Posting data was unsuccessful.';
        //    console.log("Fail:"+$scope.displayres);
        //    console.log("Fail:"+$scope.answer);
        //    //console.log(data);
        //});
    });

    $scope.transition = function(){
        //console.log($("body").children());
        $("body").children().eq(0).show();
        $('body').children().eq(1).hide();
    };



});
