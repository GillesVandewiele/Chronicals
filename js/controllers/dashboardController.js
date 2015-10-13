/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the dashboard view.
 */


var app = angular.module('Chronic', ['onsen.directives']);

app.controller("dashboardController", function($scope){


});

window.onload = function(){
    callLater(changeMitTile());
}

changeMitTile = function(){
    startTimes.forEach(function(entry){
        console.log(entry+"\n");
    });
    console.log(this.startTimes);
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

