/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the dashboard view.
 */

angular.module('Chronic').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json, * / *";

    $httpProvider.defaults.headers.common["Content-Type"] = "application/json, text/plain";
    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

}
]);
angular.module('Chronic').controller("dashboardController", function($scope, dataService,$http) {

    $scope.dialogs = {};
    ons.ready(function() {
        $('.hidden').removeClass("hidden");
        $('#loadingImg').hide();
    });

    $scope.transition = function(){
        //console.log($("body").children());
        $("body").children().eq(0).show();
        $('body').children().eq(1).hide();
    };

    $scope.show = function (dlg) {
        if (dataService.getHeadachesNoEnd().length == 0) {
            return;
        }
        if (!$scope.dialogs[dlg]) {
            ons.createDialog(dlg).then(function (dialog) {
                $scope.dialogs[dlg] = dialog;
                dialog.show();
            });
        } else {
            $scope.dialogs[dlg].show();
        }
    };

    ons.ready(function () {
        $('.hidden').removeClass("hidden");
        var user = {
            "firstName": "Kiani",
            "lastName": "Lannoye",
            "birthDate": "23-12-1992",
            "email": "kdlannoy@gmail.com",
            "password": ""+sha3_512("0123"),
            "isMale": true,
            "relation": 2,
            "advice": "",
            "isEmployed": true,
            "diagnosis": ""};



        $scope.getShitFromRest();




        ////register user
        //$http.post('http://localhost:8080/Chronic/rest/PatientService/patients', JSON.stringify(user)).
        //success(function (data, status, headers, config) {
        //
        //    console.log("Return van indienen user:"+status);
        //}).
        //error(function (data, status, headers, config) {
        //    console.log("error creating user: "+status);
        //    console.log("data:" +data);
        //});

        ////retrieve user
        //$http.get('http://localhost:8080/Chronic/rest/PatientService/patients?lastName='+user.lastName+'&firstName='+user.firstName, {headers:{'Authorization':'Basic '+btoa(user.email+":"+sha3_512(user.password+dataService.getApiKey()))}}).
        //success(function (data, status, headers, config) {
        //    console.log("User retrieved:",data);
        //}).
        //error(function (data, status, headers, config) {
        //    console.log("error retrieving user: "+status);
        //    console.log("data:" +data);
        //});


        //console.log(dataService.getPasswordHash());
        //$http({ method: 'GET', url: 'http://localhost:8080/Chronic/rest/SymptomService/Symptoms' }).
        //success(function (data, status, headers, config) {
        //    alert(""+data);
        //    console.log(data);
        //}).
        //error(function (data, status, headers, config) {
        //    alert("error retrieving data")
        //});
        //
        if (dataService.getHeadachesNoEnd().length > 0) {
            $('.dashboardFooter').css("background-color", "#f9332f");
            $('.dashboardFooter').empty();
            $('.dashboardFooter').attr("ng-click", "show('navigator.html')");
            //console.log("lel", dataService.getHeadachesNoEnd()[dataService.getHeadachesNoEnd().length - 1].intensityValues[0].key);
            var hours = parseInt(Math.abs(new Date() - new Date(dataService.getHeadachesNoEnd()[dataService.getHeadachesNoEnd().length - 1].intensityValues[0].key)) / 36e5);
            //console.log("duratie: ", hours);
            $('.dashboardFooter').append('<p>Uw hoofdpijn duurt al ' + hours + ' uur</p><p>Druk hier om meer info toe te voegen</p>');
            var current = dataService.getHeadachesNoEnd()[dataService.getHeadachesNoEnd().length - 1];
            dataService.setCurrentHeadache(current);
            //console.log("currentHeadache:", dataService.getCurrentHeadache());
            //console.log("currentHeadache", dataService.getCurrentHeadache());


        } else {
            if(dataService.getHeadacheList() != null && dataService.getHeadacheList().length > 0){
                $('.dashboardFooter').empty();
                var hours = parseInt(Math.abs(new Date() - new Date(dataService.getHeadacheList()[dataService.getHeadacheList().length - 1].end)) / 36e5);
                $('.dashboardFooter').append('<p ng-click="show(navigator.html)">U heeft al ' + hours + ' uur geen hoofdpijn meer gehad!</p>');
            } else {
                $('.dashboardFooter').empty();
                $('.dashboardFooter').append('<p>Welkom! Klik hier voor een korte handleiding</p>');
                $('.dashboardFooter').click(function(){
                    location.href='manual.html';
                });
            }
        }

    });

    var dateA = null;
    var dateB = null;
    $scope.listItems = [];
    if ($scope.listItems.length > 0) {
        $scope.listItems = [];
    }

    $scope.listItems = [];
    Array.prototype.push.apply($scope.listItems, dataService.getHeadacheList());
    Array.prototype.push.apply($scope.listItems, dataService.getMedicineList());

    if ($scope.listItems != null && $scope.listItems.length > 0)
        $scope.listItems.sort(function (a, b) {

            if (a.hasOwnProperty('end')) {//if it is a headache it has property end
                dateA = a.intensityValues[0].key;
            } else {
                dateA = a.date;
            }

            if (b.hasOwnProperty('end')) {//if it is a headache it has property end
                dateB = b.intensityValues[0].key;
            } else {
                dateB = b.date;
            }


            return (new Date(dateB.toString())) - (new Date(dateA.toString()));
        });

    $scope.getTimeDateString = function (tijdstip) {
        var datum = new Date(tijdstip);
        return "" + (datum.getDate()) + "/" + (datum.getMonth() + 1) + " " + (datum.getHours() < 10 ? '0' : '') + datum.getHours() + ":" + (datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes();
    };

    $scope.clearVariables = function () {
        dataService.setCurrentHeadache(null);
        dataService.setCurrentMedicine(null);
    };

    $scope.closeListItem = function () {
        //console.log("currentHeadache preSetEnd", currentHeadache, dataService.getCurrentHeadache());
        var currentHeadache = dataService.getCurrentHeadache();
        var orig = jQuery.extend(true, {}, currentHeadache);;
        currentHeadache.end = new Date();
        currentHeadache.location = "LEL";
        dataService.setCurrentHeadache(currentHeadache);
        dataService.removeHeadache(orig);
        dataService.addHeadache(currentHeadache);

        //console.log("currentHeadache", currentHeadache, dataService.getCurrentHeadache());
    };


    $scope.deleteListItem = function(){
        dataService.removeHeadache(dataService.getCurrentHeadache());

    };

    $scope.getShitFromRest = function(){
            $http({ method: 'GET', url: 'http://localhost:8080/Chronic/rest/DrugService/drugs' }).
            success(function (data, status, headers, config) {
                //alert(""+data);

                var list = data;

                if(JSON.parse(localStorage.getItem("drugList")) == null){
                    //console.log("tis null");
                    localStorage.setItem("drugList",JSON.stringify(list));
                }else{
                    //console.log("tis niet null");
                    list.concat(JSON.parse(localStorage.getItem("drugList")));
                    localStorage.setItem("drugList",JSON.stringify(list));
                }
                //return drugsList;
            }).
            error(function (data, status, headers, config) {
                console.log("geen connectie met rest service");
                var drugsList =  [{id: 0, name:"drug1", description:"this is a description of drug1"}, {id: 1, name:"drug2", description:"this is a description of drug2"},
                    {id: 2, name:"drug3", description:"this is a description of drug3"}, {id: 3, name: "...", description: "this is a description"}];
                if(JSON.parse(localStorage.getItem("drugList"))==null){
                    var drugsList =  [{id: 0, name:"drug1", description:"this is a description of drug1"}, {id: 1, name:"drug2", description:"this is a description of drug2"},
                        {id: 2, name:"drug3", description:"this is a description of drug3"}, {id: 3, name: "...", description: "this is a description"}];
                        localStorage.setItem("drugList", JSON.stringify(drugsList));
                }
                //return drugsList;
            });
    }
}
);

