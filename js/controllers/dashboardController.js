/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the dashboard view.
 */


var app = angular.module('Chronic', ['onsen.directives']);

app.controller("dashboardController", function($scope){

    $scope.startTimes = [new Date(), new Date(), new Date()];
    $scope.intensities = [8,8,8];

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
            + (this.startTimes[i].getHours()+1)+":"
            + (this.startTimes[i].getMinutes())
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

