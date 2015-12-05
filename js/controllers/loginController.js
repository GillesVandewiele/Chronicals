/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('loginController', function($scope, dataService,$http){

    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    // Set everything to null until a login has occured
    dataService.registerUser(null, null, null, null, null, null, null, null);

    $scope.cors = function(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }

    $scope.transition = function(){
        //console.log($("body").children());
        $("body").children().eq(0).show();
        $('body').children().eq(1).hide();
    };

    $scope.email = dataService.getEmail();
    $scope.password = "";

    //Focus on the correct field
    if($scope.email==""){
        $('#login__username').focus();
    }else{
        $('#login__password').focus();
    }

    var array_compare = function(array1, array2){
        return (array1.length == array2.length) && array1.every(function(element, index) {
            return element === array2[index];
        });
    };

    $scope.submitLogin = function(){

        var pwHash = sha3_512($scope.password);
        //try to login
        //retrieve user

        // We can't use getAuthorization yet from the dataservice since no user is registered yet.
        $http.get('http://tw06v033.ugent.be/Chronic/rest/PatientService/login', {headers:{'Authorization':'Basic '+btoa($scope.email+":"+sha3_512(sha3_512($scope.password)+dataService.getApiKey()))}}).
        success(function (data, status, headers, config) {
            console.log("User succesfully logged in:",data);
            var user = data;
            console.log(data.advice);
            dataService.setAdvice(data.advice);
            dataService.registerUser(user.firstname, user.lastname, user.birthdate, user.sex, user.status, user.employment, user.email, sha3_512($scope.password), user.patientID);
            dataService.syncDB();
            $scope.transition();
            location.href="dashboard.html";
        }).
        error(function (data, status, headers, config) {
            console.log("error loggin in: "+status);
            console.log("data:" +data);
            if(dataService.getPasswordHash()==null || dataService.getPasswordHash().length<1){
                $(".error_message").show();
            }else{
                if(dataService.getPasswordHash().toString()==pwHash.toString() && dataService.getEmail() == $scope.email){
                    //$("#container").css("display", "none");
                    //$("#loadingImg").show();
                    $scope.transition();
                    location.href="dashboard.html";
                }else{
                    $(".error_message").show();
                }
            }

        });


    }

});


//angular.module('Chronic.directives', [])
//    .directive('pwCheck', [function () {
//        return {
//            require: 'ngModel',
//            link: function (scope, elem, attrs, ctrl) {
//                var firstPassword = '#' + attrs.pwCheck;
//                elem.add(firstPassword).on('keyup', function () {
//                    scope.$apply(function () {
//                        var v = elem.val()===$(firstPassword).val();
//                        ctrl.$setValidity('pwmatch', v);
//                    });
//                });
//            }
//        }
//    }]);
