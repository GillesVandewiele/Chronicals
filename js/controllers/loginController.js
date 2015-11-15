/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller to add and modify headaches.
 */

angular.module('Chronic').controller('loginController', function($scope, dataService){

    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
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

        var pwHash = CryptoJS.SHA3($scope.password);
        if(array_compare(dataService.getPasswordHash().words,pwHash.words) && dataService.getEmail() == $scope.email){
            //$("#container").css("display", "none");
            //$("#loadingImg").show();
            $scope.transition();
            location.href="dashboard.html";
        }else{
            $(".error_message").show();
        }
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
