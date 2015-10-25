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






});


//window.onload = $scope.fillEvents;
//});



