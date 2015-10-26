/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the dashboard view.
 */


angular.module('Chronic').controller("dashboardController", function($scope, dataService){

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




    var dateA = null;
    var dateB = null;
    $scope.listItems =[];
    if($scope.listItems.length>0){
        $scope.listItems = [];
    }

    $scope.listItems = [];
    Array.prototype.push.apply($scope.listItems,dataService.getHeadacheList());
    Array.prototype.push.apply($scope.listItems, dataService.getMedicineList());

    if($scope.listItems != null && $scope.listItems.length>0)
        $scope.listItems.sort(function(a,b){

            if(a.hasOwnProperty('end')){//if it is a headache it has property end
                dateA = a.intensityValues[0].key;
            }else{
                dateA = a.date;
            }

            if(b.hasOwnProperty('end')){//if it is a headache it has property end
                dateB = b.intensityValues[0].key;
            }else{
                dateB = b.date;
            }


            return (new Date(dateB.toString())) - (new Date(dateA.toString()));
        });

    $scope.getTimeDateString = function(tijdstip){
        var datum = new Date(tijdstip);
        return ""+(datum.getDate())+"/"+(datum.getMonth()+1)+" "+(datum.getHours()<10?'0':'')+datum.getHours()+":"+(datum.getMinutes()<10?'0':'')+datum.getMinutes();
    }


});

