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
        Ladda.bind( 'input[type=submit]' );
    });

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
        $http.get('http://localhost:8080/Chronic/rest/PatientService/login', {headers:{'Authorization':'Basic '+btoa($scope.email+":"+sha3_512(sha3_512($scope.password)+dataService.getApiKey()))}}).
        success(function (data, status, headers, config) {
            console.log("User succesfully logged in:",data);
            var user = data;
            dataService.registerUser(user.firstname, user.lastname, user.birthdate, user.sex, user.status, user.employment, user.email, sha3_512($scope.password));
            $scope.transition();
            location.href="dashboard.html";
        }).
        error(function (data, status, headers, config) {
            console.log("error loggin in: "+status);
            console.log("data:" +data);
            if(dataService.getPasswordHash().toString()==pwHash.toString() && dataService.getEmail() == $scope.email){
                //$("#container").css("display", "none");
                //$("#loadingImg").show();
                $scope.transition();
                location.href="dashboard.html";
            }else{
                $(".error_message").show();
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
