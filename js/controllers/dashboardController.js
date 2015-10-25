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


	console.log(dataService.getHeadacheList());
    $scope.listItems = dataService.getHeadacheList();
    if($scope.listItems) Array.prototype.push.apply($scope.listItems, dataService.getMedicineList());
    else $scope.listItems = dataService.getMedicineList();
    if($scope.listItems != null && $scope.listItems.length>0)
        $scope.listItems.sort(function(a,b){
            return b.intensityValues[0].key - a.intensityValues[0].key;
        });

    $scope.getTimeDateString = function(tijdstip){
        var datum = new Date(tijdstip.intensityValues[0].key);
        return ""+(datum.getDate())+"/"+(datum.getMonth()+1)+" "+(datum.getHours()<10?'0':'')+datum.getHours()+":"+(datum.getMinutes()<10?'0':'')+datum.getMinutes();
    }


});

window.onload = function(){
    //callLater(changeMitTile());
}

changeMitTile = function(){
    for (i = 0; i < 3; i++) {
        $("#midTile").append("<div style='width: 70%; margin-right: 0; float: left'><p >"
            + this.startTimes[i].getDate()+"/"
            + (this.startTimes[i].getMonth()+1)+"/"
            + this.startTimes[i].getFullYear()+"\t"
            + (this.startTimes[i].getHours())+":"
            + (("0" + this.startTimes[i].getMinutes()).substr(-2))
            + "</p></div>");
        $("#midTile").append("<div style=\"float: right; margin-right:5px;\"><p>8/10</p></div>");
        console.log("Date:" + this.startTimes[i] + "\n")
    }

}


// Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
// that use async data access APIs
var callLater = function(callback, data) {
    if (callback) {
        setTimeout(function() {
            callback(data);
        });
    }
}


this.startTimes = [new Date(), new Date(), new Date()];

