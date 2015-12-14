/*!
 Chronicals, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('loginController', function ($scope, dataService, $http) {


        ons.ready(function () {
            $('.hidden').removeClass("hidden");
            $('#loadingImg').hide();
        });

        // Set everything to null until a login has occured
    //dataService.registerUser(null, null, null, null, null, null, null, null);

        $scope.transition = function () {
            //console.log($("body").children());
            $("body").children().eq(0).show();
            $('body').children().eq(1).hide();
        };

        $scope.email = dataService.getEmail();
    //console.log("Email:" + $scope.email);
        $scope.password = "";

        //Focus on the correct field
        if ($scope.email == "") {
            $('#login__username').focus();
        } else {
            $('#login__password').focus();
        }

        var array_compare = function (array1, array2) {
            return (array1.length == array2.length) && array1.every(function (element, index) {
                    return element === array2[index];
                });
        };

        $scope.submitLogin = function () {

            var pwHash = sha3_512($scope.password);
            //try to login
            //retrieve user

            // We can't use getAuthorization yet from the dataservice since no user is registered yet.
            //dataService.getDBStatus().then(function(result){
                $http.get('http://tw06v033.ugent.be/Chronic/rest/PatientService/login', {headers: {'Authorization': 'Basic ' + btoa($scope.email + ":" + sha3_512(sha3_512($scope.password) + dataService.getApiKey()))}}).
                success(function (data, status, headers, config) {
                    //console.log("User succesfully logged in:", data);
                    var user = data;
                    dataService.setAdvice(data.advice);
                    console.log("Got user: ", JSON.stringify(user));
                    dataService.registerUser(user.firstName, user.lastName, user.birthDate, user.isMale, user.relation, user.isEmployed, user.email, sha3_512($scope.password), user.patientID);
                    dataService.syncDB().then(function (result) {
                        $scope.transition();
                        location.href = "dashboard.html";
                    }, function(result){
                        alert("failed");
                    });

                }).
                error(function (data, status, headers, config) {
                    if(status==0){
                        alert("U bent niet verbonden met het internet, of de server is offline. U werkt nu verder met lokale gegevens tot u opnieuw verbinding met de server heeft");
                        if (dataService.getCurrentUser() == null || dataService.getCurrentUser().passwordHash == null || dataService.getCurrentUser().passwordHash.length < 1) {
                            alert("Er is lokaal nog geen gebruiker ingesteld. Verbind eerst met het internet en probeer in te loggen");
                        } else {
                            if (dataService.getCurrentUser().passwordHash == pwHash.toString() && dataService.getCurrentUser().email == $scope.email) {
                                $scope.transition();
                                location.href = "dashboard.html";
                            } else {
                                $(".error_message").show();
                            }
                        }
                    }else{
                        //console.log("error loggin in: " + status);
                        //console.log("data:" + data);
                    }



                });
            //});

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
