/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the dashboard view.
 */


angular.module('Chronic').controller("dashboardController", function($scope, dataService) {

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
    }

    ons.ready(function () {
        $('.hidden').removeClass("hidden");

        if (dataService.getHeadachesNoEnd().length > 0) {
            $('.dashboardFooter').css("background-color", "#f9332f");
            $('.dashboardFooter').empty();
            $('.dashboardFooter').attr("ng-click", "show('navigator.html')");
            console.log("lel", dataService.getHeadachesNoEnd()[dataService.getHeadachesNoEnd().length - 1].intensityValues[0].key);
            var hours = parseInt(Math.abs(new Date() - new Date(dataService.getHeadachesNoEnd()[dataService.getHeadachesNoEnd().length - 1].intensityValues[0].key)) / 36e5);
            console.log("duratie: ", hours);
            $('.dashboardFooter').append('<p>Uw hoofdpijn duurt al ' + hours + ' uur</p><p>Druk hier om meer info toe te voegen</p>');
            dataService.setCurrentHeadache(dataService.getHeadachesNoEnd()[dataService.getHeadachesNoEnd().length - 1]);


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
        dataService.getCurrentHeadache().end = new Date();
    };


    $scope.addDetailsListItem = function(){

    };

    $scope.deleteListItem = function(){
        dataService.removeHeadache(dataService.getCurrentHeadache());

    };
}
);

