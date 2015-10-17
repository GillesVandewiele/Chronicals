/*!
 NAAM VAN ONS PROJECT, v1.0
 Created by Kiani Lannoye & Gilles Vandewiele, commissioned by UZ Ghent
 https://github.com/kianilannoye/Chronicals

 This file contains the controller for the history views.
 */


var app = angular.module('Chronic', ['onsen.directives']);

app.controller("historyController", function($scope){

    $scope.listItems = [
        /*
                parameters:
                            headache/mecicine 0/1
                                    headache
                                                    startDate+time
                                                    endDate+time
                                                    Intensity
                                    medicine
                                                    date+time
                                                    name of medicine
                                                    quantity
         */
                        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), "Sumatriptan", Math.random(200)],
        [new Date(), "Sumatriptan", Math.random(200)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), "Sumatriptan", Math.random(200)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), new Date().setHours(new Date().getHours()+3), Math.random(10)],
        [new Date(), "Sumatriptan", Math.random(200)]
    ];
    });

window.onload = function(){
    //callLater(changeMitTile());
}



// Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
// that use async data access APIs


