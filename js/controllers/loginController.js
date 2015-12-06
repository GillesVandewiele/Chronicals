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

}]).controller('loginController', function ($scope, dataService, $http) {


    ons.ready(function () {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    // Set everything to null until a login has occured
    dataService.registerUser(null, null, null, null, null, null, null, null);

    $scope.transition = function () {
        //console.log($("body").children());
        $("body").children().eq(0).show();
        $('body').children().eq(1).hide();
    };

    $scope.email = dataService.getEmail();
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
        $http.get('http://tw06v033.ugent.be/Chronic/rest/PatientService/login', {headers: {'Authorization': 'Basic ' + btoa($scope.email + ":" + sha3_512(sha3_512($scope.password) + dataService.getApiKey()))}}).
        success(function (data, status, headers, config) {
            console.log("User succesfully logged in:", data);
            var user = data;
            dataService.setAdvice(data.advice);
            dataService.registerUser(user.firstName, user.lastName, user.birthDate, user.isMale, user.relation, user.isEmployed, user.email, sha3_512($scope.password), user.patientID);
            var promise = dataService.syncDB();
            promise.then(
                function(){
                    $scope.transition();
                    location.href = "dashboard.html";
                }
            );
            /*$scope.syncDB().then(function(){
                alert("jajajaj");
                $scope.transition();
                location.href = "dashboard.html";
            });*/
        }).
        error(function (data, status, headers, config) {
            console.log("error loggin in: " + status);
            console.log("data:" + data);
            if (dataService.getPasswordHash() == null || dataService.getPasswordHash().length < 1) {
                $(".error_message").show();
            } else {
                if (dataService.getPasswordHash().toString() == pwHash.toString() && dataService.getEmail() == $scope.email) {
                    //$("#container").css("display", "none");
                    //$("#loadingImg").show();
                    $scope.transition();
                    location.href = "dashboard.html";
                } else {
                    $(".error_message").show();
                }
            }

        });

        $scope.syncDB = function () {
            return new Promise(
                function(){
            // First check if there's an internet connection available
            var currentUser = JSON.parse(localStorage.getItem("currentUser"));
            //$http.get('http://tw06v033.ugent.be/Chronic/rest/DBService/status').
            //success(function (data, status, headers, config) {
            // Get advice for patient

            // Get new drugs
            $http.get('http://tw06v033.ugent.be/Chronic/rest/DrugService/drugs', {headers:{'Accept': 'application/json'}}).
            success(function (data, status, headers, config) {
                alert("CONNECTED TO INTERNET OR DATABASE " + status);
                var list = data;
                // drugList consists of a list specified by the doctor which is gotten remotely,
                // and a list of own-made drugs
                if(JSON.parse(localStorage.getItem("ownDrugList")) != null) {
                    list = list.concat(JSON.parse(localStorage.getItem("ownDrugList")));
                }
                list[list.length] = {id: -1, name: "...", description: "Own custom drug"};
                console.log("Druglist = ", list);
                localStorage.setItem("drugList",JSON.stringify(list));
            }).
            error(function (data, status, headers, config) {
                // If the connection failed, we just use the old drugList (this can't be the first time the app is started)
                console.log("data:"+data);
                console.log("status:"+status);
                var drugList = JSON.parse(localStorage.getItem("drugList"));
                if(drugList == null) alert("Er moet een internetverbinding aanwezig zijn wanneer u de app voor de eerste keer opstart.");
            });

            // Get new symptoms
            $http({method: 'GET', url: 'http://tw06v033.ugent.be/Chronic/rest/SymptomService/symptoms'}).
            success(function (data, status, headers, config) {
                var symptoms = data;
                symptoms.forEach(function (entry) {
                    entry["val"] = false;
                });
                localStorage.setItem("symptoms", JSON.stringify(symptoms));
            }).
            error(function (data, status, headers, config) {
                var symptoms = JSON.parse(localStorage.getItem("symptoms"));
                if(symptoms == null) alert("Er moet een internetverbinding aanwezig zijn wanneer u de app voor de eerste keer opstart.");

            });})

            // Get new triggers
            /*}).
             error(function (data, status, headers, config) {
             console.log("Status code:" + status);
             console.log("Data:" + data);
             console.log("config:"+config);
             alert("NO INTERNET OR DATABASE CONNECTION " + status)
             });*/
        }


    }

}
);


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
