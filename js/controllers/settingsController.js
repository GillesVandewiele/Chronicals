/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */


angular.module('Chronic').controller("settingsController", function($scope, dataService) {

    document.addEventListener("backbutton", function(e){
        if($.mobile.activePage.is('#login_page')){
            e.preventDefault();
        }
        else {
            if (confirm("Are you sure you want to logout?")) {
                /* Here is where my AJAX code for logging off goes */
            }
            else {
                return false;
            }
        }
    }, false);
    $scope.alert = function() {
        ons.notification.alert({
            title: 'Succes!',
            message: 'Cache en data zijn gewist!'
        });
    }

    $scope.clearCache = function(){
        console.log("Clearing cache: ");

        dataService.clearCache();
        $scope.alert();

    };

    $scope.fillEvents = function(){
        dataService.addHeadache({intensityValues: [{key: new Date(2015, 10, 25, 10, 00, 00,00)        , value:8},
            {key: new Date(2015, 10, 25, 10, 30, 00,00)        , value:6},
            {key: new Date(2015, 10, 25, 11, 30, 00,00)        , value:4},
            {key: new Date(2015, 10, 25, 11, 00, 00,00)        , value:8},
            {key: new Date(2015, 10, 25, 12, 30, 00,00)        , value:2}
        ],
            end: new Date(2015, 10, 25, 13, 00, 00,00), location: null, triggers: [], symptoms: []});
        dataService.addHeadache({intensityValues: [{key: new Date(2015, 10, 24, 10, 00, 00,00)        , value:8},
            {key: new Date(2015, 10, 24, 10, 30, 00,00)        , value:6},
            {key: new Date(2015, 10, 24, 11, 30, 00,00)        , value:4},
            {key: new Date(2015, 10, 24, 11, 00, 00,00)        , value:8},
            {key: new Date(2015, 10, 24, 12, 30, 00,00)        , value:2}
        ],
            end: new Date(2015, 10, 24, 13, 00, 00,00), location: null, triggers: [], symptoms: []});
        dataService.addHeadache({intensityValues: [{key: new Date(2015, 10, 23, 10, 00, 00,00)        , value:8},
            {key: new Date(2015, 10, 23, 10, 30, 00,00)        , value:6},
            {key: new Date(2015, 10, 23, 11, 30, 00,00)        , value:4},
            {key: new Date(2015, 10, 23, 11, 00, 00,00)        , value:8},
            {key: new Date(2015, 10, 23, 12, 30, 00,00)        , value:2}
        ],
            end: new Date(2015, 10, 23, 13, 00, 00,00), location: null, triggers: [], symptoms: []});


    }




});


//window.onload = $scope.fillEvents;
//});



